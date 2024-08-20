import React, { useCallback, useEffect, useState } from 'react'
import path from '../utils/path'
import { useNavigate } from 'react-router-dom'
import * as apis from '../apis'
import { useSelector } from 'react-redux'

const SignUp = () => {
  const navigate = useNavigate()
  const authenticated = useSelector(state => state.users.login.authenticated)
  useEffect(() => {
    if(authenticated === true) {
      navigate('/')
    }
  })

  const [response, setResponse] = useState({})
  const [success, setSuccess] = useState({})
  const [error, setError] = useState({})

  const [reportSuccess, setReportSuccess] = useState(false)
  useEffect(() => {
    if(success?.successCode === 201) {
      setReportSuccess(true)
    }
  }, [success])

  useEffect(() => {
    if(error?.errorCode === 409) alert(error?.errorDetail)
  }, [error])

  const trueStyle = 'hidden'
  const falseStyle = 'pt-[3px] text-red-600 text-[14px] block'
  const [stateCfPwdStyle, setStateCfPwdStyle] = useState(trueStyle)

  const [blankUsername, setBlankUsername] = useState(trueStyle)
  const [blankEmail, setBlankEmail] = useState(trueStyle)
  const [blankPwd, setBlankPwd] = useState(trueStyle)
  const [blankCfPwd, setBlankCfPwd] = useState(trueStyle)

  let data = {
    username: '',
    email: '',
    password: '',
  }

  const [usernameValue, setUsernameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [pwdValue, setPwdValue] = useState('')
  const [cfPwdValue, setCfPwdValue] = useState('')

  const handleReportSuccess = () => {
    setReportSuccess(false)
    setUsernameValue('')
    setEmailValue('')
    setPwdValue('')
    setCfPwdValue('')
  }

  useEffect(() => {
    if(pwdValue !== cfPwdValue) setStateCfPwdStyle(falseStyle)
    else setStateCfPwdStyle(trueStyle)
    if(usernameValue !== '') setBlankUsername(trueStyle)
    if(emailValue !== '') setBlankEmail(trueStyle)
    if(pwdValue !== '') setBlankPwd(trueStyle)
    if(cfPwdValue !== '') setBlankCfPwd(trueStyle)
  }, [usernameValue, emailValue, pwdValue, cfPwdValue])

  const [usernameFocus, setUsernameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  const [cfPwdFocus, setCfPwdFocus] = useState(false)

  const handleBlank = useCallback(() => {
    if(usernameValue === '') setBlankUsername(falseStyle)
    if(emailValue === '') setBlankEmail(falseStyle)
    if(pwdValue === '') setBlankPwd(falseStyle)
    if(cfPwdValue === '') setBlankCfPwd(falseStyle)
  })

  const handleSubmit = async () => {
    handleBlank()
    
    if(usernameValue === '' || emailValue === '' ||
      pwdValue === '' || cfPwdValue === '' || pwdValue !== cfPwdValue) return
    else {
      data = {
        username: usernameValue,
        email: emailValue,
        password: pwdValue,
      }

      try {
        const res = await apis.signUp(data)
        setResponse(res)
        setSuccess({
          successCode: response.status,
          successDetail: response.data.detail,
        })
        setError({})
      } catch (error) {
        setSuccess({})
        setError({
            errorCode: error.response?.status,
            errorDetail: error.response?.data.detail,
        })
      }
    }
  }

  function handleFocus(x) {
    if(x === 'username' && !usernameFocus) setUsernameFocus(true)
    if(x === 'email' && !emailFocus) setEmailFocus(true)
    if(x === 'pwd' && !pwdFocus) setPwdFocus(true)
    if(x === 'cfPwd' && !cfPwdFocus) setCfPwdFocus(true)
  }
  function handleBlur(x) {
    if(x === 'username' && usernameFocus) setUsernameFocus(false)
    if(x === 'email' && emailFocus) setEmailFocus(false)
    if(x === 'pwd' && pwdFocus) setPwdFocus(false)
    if(x === 'cfPwd' && cfPwdFocus) setCfPwdFocus(false)
  }

  const handleInputChange = (x, event) => {
    if(x === 'username') setUsernameValue(event.target.value)
    if(x === 'email') setEmailValue(event.target.value)
    if(x === 'pwd') setPwdValue(event.target.value)
    if(x === 'cfPwd') setCfPwdValue(event.target.value)
  }

  return (
    <div className='flex w-full justify-center'>
      <div className={`left-0 top-[70px] flex w-screen h-screen fixed bg-black bg-opacity-50 justify-center ${reportSuccess ? 'block' : 'hidden'}`}>
        <div className={`flex flex-col bg-zinc-900 w-[400px] border-2 border-gray-300 rounded-2xl h-[300px] items-center mt-[100px] text-gray-300`}>
          <div className='flex w-full text-white justify-end'>
            <button 
              className='mr-[10px] mt-[5px] text-[18px] font-bold'
              onClick={handleReportSuccess}
            >X</button>
          </div>
          <div className='text-green-600 text-[24px] mt-[40px]'>
            Successfully created account
          </div>
          <div className='text-gray-300 text-[20px] mt-[40px]'>
            Return to
            <a 
              className='ml-[6px] mr-[6px] cursor-pointer underline hover:text-gray-100'
              href={path.log_in}
            >Login</a>
            or
            <button 
              className='ml-[6px] underline hover:text-gray-100'
              onClick={handleReportSuccess}
            >SignUp</button>
          </div>
        </div>
      </div>
      {authenticated ? null : 
      <div className='w-full flex justify-center mt-[25px]'>
        <div className={`flex flex-col bg-zinc-900 w-3/4 border border-gray-500 rounded-2xl h-[750px] items-center py-[35px] px-[80px] text-gray-300`}>
          <div className='text-[30px] font-bold'>SIGN UP</div>
          <div className='flex flex-col w-full text-gray-300 text-[19px] mt-[50px]'>
            <div className='flex flex-col h-[110px]'>
              Username
              <input 
                className={`placeholder-gray-500 rounded-xl border ${usernameFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
                type='text' 
                placeholder='Username'
                onFocus={() => handleFocus('username')}
                onBlur={() => handleBlur('username')}
                value={usernameValue}
                onChange={(e) => handleInputChange('username', e)}
              />
              <div className={blankUsername}>
                Cannot be left blank
              </div>
            </div>
            <div className='flex flex-col h-[110px]'>
              Email
              <input 
                className={`placeholder-gray-500 rounded-xl border ${emailFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
                type='text' 
                placeholder='Email'
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                value={emailValue}
                onChange={(e) => handleInputChange('email', e)}
              />
              <div className={blankEmail}>
                Cannot be left blank
              </div>
            </div>
            <div className='flex flex-col h-[110px]'>
              Password
              <input 
                className={`placeholder-gray-500 rounded-xl border ${pwdFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
                type='password' 
                placeholder='Password'
                onFocus={() => handleFocus('pwd')}
                onBlur={() => handleBlur('pwd')}
                value={pwdValue}
                onChange={(e) => handleInputChange('pwd', e)}
              />
              <div className={blankPwd}>
                Cannot be left blank
              </div>
            </div>
            <div className='flex flex-col h-[125px]'>
              Confirm Password
              <input 
                className={`placeholder-gray-500 rounded-xl border ${cfPwdFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
                type='password' 
                placeholder='Confirm Password'
                onFocus={() => handleFocus('cfPwd')}
                onBlur={() => handleBlur('cfPwd')}
                value={cfPwdValue}
                onChange={(e) => handleInputChange('cfPwd', e)}
              />
              <div className={blankCfPwd}>
                Cannot be left blank
              </div>
              <div className={stateCfPwdStyle}>
                Password does not match with confirm password
              </div>
            </div>
            
          </div>
            <button
              className='flex text-[20px] mt-[25px] w-[200px] h-[40px] border border-gray-300 bg-zinc-800 hover:bg-opacity-70 rounded-lg text-gray-300 font-bold tracking-wider items-center justify-center'
              onClick={handleSubmit}
            >SUBMIT</button>
            <div className='text-gray-300 text-[15px] mt-[20px]'>
              Do you already have an account yet?
              <a className='underline ml-[6px] hover:text-white' href={path.log_in}>Login</a>
            </div>
        </div>
      </div>}
    </div>
  )
}

export default SignUp
