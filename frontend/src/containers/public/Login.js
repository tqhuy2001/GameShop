import React from 'react'
import { useState, useCallback, useEffect } from 'react'
import * as actions from '../../stores/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state.users)
  const error = state.login?.error
  const success = state.login?.success

  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem('token') !== null) {
      navigate('/')
    }
  })
  
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
    dispatch(actions.login(data))
  }

  if(localStorage.getItem('token') === null) return (
    <div className='flex w-full justify-center'>
      <div className={`flex flex-col bg-zinc-700 w-2/3 border-2 border-gray-300 rounded-2xl h-[550px] items-center py-[35px] px-[80px] text-gray-300 mt-[25px]`}>
        <div className='text-[30px] font-bold'>LOGIN</div>
        <div className='flex flex-col w-full text-gray-300 text-[19px] mt-[50px]'>
          <div className='flex flex-col h-[110px]'>
            Username
            <input 
              className={`placeholder-gray-500 rounded-xl border ${usernameFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-700 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
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
          <div className='flex flex-col h-[130px]'>
            Password
            <input 
              className={`placeholder-gray-500 rounded-xl border ${pwdFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-700 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
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
        <div className='flex flex-col items-center w-full h-[80px] mt-[10px]'>
          <div className='h-[30px]'>
            <div className={(!success && error?.errorCode === 403) ? falseStyle : trueStyle}>
              {error?.errorDetail}
            </div>
          </div>
          <button
            className='mt-[10px] flex text-[20px] w-[200px] h-[40px] border border-gray-300 bg-zinc-600 rounded-lg text-gray-300 font-bold tracking-wider items-center justify-center hover:bg-gray-400 hover:text-gray-950'
            onClick={handleSubmit}
          >LOGIN</button>
        </div>
      </div>
    </div>
  )
}

export default Login
