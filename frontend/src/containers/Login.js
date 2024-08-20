import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import * as actions from '../stores/actions'
import path from '../utils/path'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import icons from '../utils/icons'

const Login = () => {
  const FaCheck = icons.FaCheck

  const dispatch = useDispatch()
  const state = useSelector(state => state.users.login)
  const error = state.error
  const authenticated = state.authenticated
  const [isRemembered, setIsRemembered] = useState(false)

  const navigate = useNavigate()
  useEffect(() => {
    if(authenticated === true) {
      navigate('/')
    }
  }, [authenticated])

  let data = {
    username: '',
    password: '',
  }

  const trueStyle = 'hidden'
  const falseStyle = 'text-red-600 text-[15px] block'

  const [usernameValue, setUsernameValue] = useState('')
  const [pwdValue, setPwdValue] = useState('')

  const [usernameFocus, setUsernameFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [blankUsername, setBlankUsername] = useState(trueStyle)
  const [blankPwd, setBlankPwd] = useState(trueStyle)

  useEffect(() => {
    if(usernameValue !== '') setBlankUsername(trueStyle)
    if(pwdValue !== '') setBlankPwd(trueStyle)
  }, [usernameValue, pwdValue])

  function handleFocus(x) {
    if(x === 'username' && !usernameFocus) setUsernameFocus(true)
    if(x === 'pwd' && !pwdFocus) setPwdFocus(true)
  }
  function handleBlur(x) {
    if(x === 'username' && usernameFocus) setUsernameFocus(false)
    if(x === 'pwd' && pwdFocus) setPwdFocus(false)
  }

  const handleInputChange = (x, event) => {
    if(x === 'username') setUsernameValue(event.target.value)
    if(x === 'pwd') setPwdValue(event.target.value)
  }

  const handleBlank = useCallback(() => {
    if(usernameValue === '') setBlankUsername(falseStyle)
    if(pwdValue === '') setBlankPwd(falseStyle)
  })

  const handleSubmit = () => {
    handleBlank()
    
    if(usernameValue === '' || pwdValue === '') return
    else {
      data = {
        username: usernameValue,
        password: pwdValue,
      }
    }
    dispatch(actions.login(data, isRemembered))
  }

  const handleRemembered = () => {
    setIsRemembered(!isRemembered)
  }

  return (
    <div className='flex w-full justify-center'>
      {authenticated ? null : 
      <div className={`flex flex-col bg-zinc-900 w-3/4 border border-gray-500 rounded-2xl h-[550px] items-center py-[35px] px-[80px] text-gray-300 mt-[25px]`}>
        <div className='text-[30px] font-bold'>LOGIN</div>
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
          <div className='flex flex-col mb-[25px]'>
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
        </div>
        <div className='w-full flex justify-between px-[5px]'>
          <div className='flex items-center'>
            <div 
              className='select-none w-[15px] h-[15px] flex items-center relative cursor-pointer bg-white bg-opacity-0 hover:bg-opacity-10 border border-gray-500 rounded-sm'
              onClick={handleRemembered}>
              <span className={`absolute ml-[1px] text-gray-300 ${isRemembered ? 'block' : 'hidden'}`}><FaCheck size={10}/></span>
            </div>
            <div className='text-gray-300 ml-[4px]'>Remember me</div>
          </div>
          <div className='hover:underline cursor-pointer'>Forgot password</div>
        </div>
        <div className='flex flex-col items-center w-full h-[80px] mt-[10px]'>
          <div className='h-[30px]'>
            <div className={(!authenticated && error?.errorCode === 403) ? falseStyle : trueStyle}>
              {error?.errorDetail}
            </div>
          </div>
          <button
            className='mt-[10px] flex text-[20px] w-[200px] h-[40px] border border-gray-300 bg-zinc-800 rounded-lg text-gray-300 font-bold tracking-wider items-center justify-center hover:bg-opacity-70'
            onClick={handleSubmit}
          >LOGIN</button>
        </div>
        <div className='text-gray-300 text-[15px] mt-[20px]'>Don't have an account?
          <a className='underline ml-[6px] hover:text-white' href={path.sign_up}>Sign Up</a>
        </div>
      </div>}
    </div>
  )
}

export default Login
