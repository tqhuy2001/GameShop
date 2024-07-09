
import React, { useState } from 'react'
import path from '../../utils/path'

const SignUp = () => {

  const [usernameFocus, setUsernameFocus] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)
  const [cfPwdFocus, setCfPwdFocus] = useState(false)

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

  return (
    <div className='flex flex-col bg-zinc-700 w-2/3 rounded-2xl h-[750px] items-center py-[35px] px-[80px] text-gray-300 '>
      <div className='text-[30px] font-bold'>SIGN UP</div>
      <div className='flex flex-col w-full text-gray-300 text-[19px] mt-[50px]'>
        <div className='flex flex-col pb-[30px]'>
          Username
          <input 
            className={`placeholder-gray-500 rounded-xl border ${usernameFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-700 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
            type='text' 
            placeholder='Username'
            onFocus={() => handleFocus('username')}
            onBlur={() => handleBlur('username')}
          />
        </div>
        <div className='flex flex-col pb-[30px]'>
          Email
          <input 
            className={`placeholder-gray-500 rounded-xl border ${emailFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-700 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
            type='text' 
            placeholder='Email'
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
          />
        </div>
        <div className='flex flex-col pb-[30px]'>
          Password
          <input 
            className={`placeholder-gray-500 rounded-xl border ${pwdFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-700 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
            type='password' 
            placeholder='Password'
            onFocus={() => handleFocus('pwd')}
            onBlur={() => handleBlur('pwd')}
          />
        </div>
        <div className='flex flex-col pb-[30px]'>
          Confirm Password
          <input 
            className={`placeholder-gray-500 rounded-xl border ${cfPwdFocus ? 'border-gray-200' : 'border-gray-500'} bg-zinc-700 h-[40px] px-[15px] outline-none text-gray-300 text-[17px] mt-[8px]`} 
            type='password' 
            placeholder='Confirm Password'
            onFocus={() => handleFocus('cfPwd')}
            onBlur={() => handleBlur('cfPwd')}
          />
        </div>
      </div>
        <button
          className='flex text-[20px] mt-[25px] w-[200px] h-[40px] border border-gray-300 bg-zinc-600 rounded-lg text-gray-300 font-bold tracking-wider items-center justify-center hover:bg-gray-400 hover:text-gray-950'
        >SUBMIT</button>
        <div className='text-gray-300 text-[15px] mt-[30px]'>
          Do you already have an account yet?
          <a className='underline ml-[6px] hover:text-white' href={path.log_in}>Login</a>
        </div>
    </div>
  )
}

export default SignUp
