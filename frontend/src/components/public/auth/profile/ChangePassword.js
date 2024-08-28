import React, { useState } from 'react'
import icons from '../../../../utils/icons'
import * as apis from '../../../../apis'

const ChangePassword = ({ cancel }) => {
  const GoEyeClosed = icons.GoEyeClosed
  const GoEye = icons.GoEye
  const SiTicktick = icons.SiTicktick
  const GiCancel = icons.GiCancel

  const [checkSaving, setCheckSaving] = useState(false)
  const [report, setReport] = useState('')
  const [successfulSaving, setSuccessfulSaving] = useState(null)

  const [valueInput, setValueInput] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })
  const [focusInput, setFocusInput] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  })
  const [appear, setAppear] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  })
  
  const handleInputChange = (input, e) => {
    if(input === 'currentPassword') setValueInput((prev) => ({...prev, currentPassword: e.target.value}))
    if(input === 'newPassword') setValueInput((prev) => ({...prev, newPassword: e.target.value}))
    if(input === 'confirmNewPassword') setValueInput((prev) => ({...prev, confirmNewPassword: e.target.value}))
  }

  const handleAppear = (input) => {
    if(input === 'currentPassword') setAppear((prev) => ({...prev, currentPassword: !prev.currentPassword}))
    if(input === 'newPassword') setAppear((prev) => ({...prev, newPassword: !prev.newPassword}))
    if(input === 'confirmNewPassword') setAppear((prev) => ({...prev, confirmNewPassword: !prev.confirmNewPassword}))
  }
  
  const handleSaveChanges = async () => {
    setCheckSaving(true)
    if(valueInput.currentPassword !== '' && valueInput.newPassword !== '' && valueInput.confirmNewPassword !== '' 
      && valueInput.newPassword === valueInput.confirmNewPassword) {
        const data = {
          current_password: valueInput.currentPassword,
          new_password: valueInput.newPassword,
        }
        try {
          const response = await apis.changePassword(data)
          setSuccessfulSaving(true)
          setReport(response.data.detail)
        } catch (error) {
          setSuccessfulSaving(false)
          setReport(error.response.data.detail)
        }
    }
  }

  return (
    <div className='flex flex-col w-full h-full'>
      <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${successfulSaving !== null ? 'block' : 'hidden'}`}>
        <div className='flex flex-col h-[200px] w-auto bg-zinc-900 rounded-xl border border-gray-500 text-gray-300 items-center justify-between'>
          <div className='flex flex-col w-full items-center'>
            <div className='font-bold text-[25px] mt-[15px] px-[20px]'>{report}</div>
            {successfulSaving === true 
            ? <SiTicktick className='text-green-500 mt-[20px]' size={40} />
            : <GiCancel className='text-red-500 mt-[20px]' size={40} />}
          </div>
          <div className='flex w-full justify-center px-[10px] gap-[40px] pb-[10px]'>
            <button 
                className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-opacity-70 rounded-md bg-blue-600'
                onClick={() => setSuccessfulSaving(null)}
              >OK</button>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full pt-[50px] items-center'>
        <div className='flex flex-col w-3/4'>
          <div className='flex flex-col w-full h-[120px]'>
            <div className='ml-[5px]'>Current Password</div>
            <div className='relative w-full mt-[5px]'>
              <span className='absolute flex h-full items-center left-[93%]' onClick={() => handleAppear('currentPassword')}>
                {appear.currentPassword
                ? <GoEyeClosed className={`opacity-35 hover:opacity-100 cursor-pointer`} size={20}/>
                : <GoEye className={`opacity-35 hover:opacity-100 cursor-pointer`} size={20}/>}
              </span>
              <input 
                className={`w-full cursor-text placeholder-gray-500 rounded-xl border ${focusInput.currentPassword ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px]`} 
                type={appear.currentPassword ? 'text' : 'password'}
                placeholder='Current Password'
                onFocus={() => setFocusInput({currentPassword: true, newPassword: false, confirmNewPassword: false})}
                onBlur={() => setFocusInput((prev) => ({...prev, currentPassword: false}))}
                value={valueInput.currentPassword}
                onChange={(e) => handleInputChange('currentPassword', e)}
              />
            </div>
            <div className={`${valueInput.currentPassword === '' && checkSaving ? 'block' : 'hidden'} ml-[5px] pt-[3px] text-red-600 text-[14px]`}>
              Cannot be left blank
            </div>
          </div>
        </div>
        <div className='flex flex-col w-3/4'>
          <div className='flex flex-col w-full h-[120px]'>
            <div className='ml-[5px]'>New Password</div>
            <div className='relative w-full mt-[5px]'>
              <span className='absolute flex h-full items-center left-[93%]' onClick={() => handleAppear('newPassword')}>
                {appear.newPassword
                ? <GoEyeClosed className={`opacity-35 hover:opacity-100 cursor-pointer`} size={20}/>
                : <GoEye className={`opacity-35 hover:opacity-100 cursor-pointer`} size={20}/>}
              </span>
              <input 
                className={`w-full cursor-text placeholder-gray-500 rounded-xl border ${focusInput.newPassword ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px]`} 
                type={appear.newPassword ? 'text' : 'password'}
                placeholder='New Password'
                onFocus={() => setFocusInput({currentPassword: false, newPassword: true, confirmNewPassword: false})}
                onBlur={() => setFocusInput((prev) => ({...prev, newPassword: false}))}
                value={valueInput.newPassword}
                onChange={(e) => handleInputChange('newPassword', e)}
              />
            </div>
            <div className={`${valueInput.newPassword === '' && checkSaving ? 'block' : 'hidden'} ml-[5px] pt-[3px] text-red-600 text-[14px]`}>
              Cannot be left blank
            </div>
          </div>
        </div>
        <div className='flex flex-col w-3/4'>
          <div className='flex flex-col w-full h-[120px]'>
            <div className='ml-[5px]'>Confirm New Password</div>
            <div className='relative w-full mt-[5px]'>
              <span className='absolute flex h-full items-center left-[93%]' onClick={() => handleAppear('confirmNewPassword')}>
                {appear.confirmNewPassword
                ? <GoEyeClosed className={`opacity-35 hover:opacity-100 cursor-pointer`} size={20}/>
                : <GoEye className={`opacity-35 hover:opacity-100 cursor-pointer`} size={20}/>}
              </span>
              <input 
                className={`w-full cursor-text placeholder-gray-500 rounded-xl border ${focusInput.confirmNewPassword ? 'border-gray-200' : 'border-gray-500'} bg-zinc-900 h-[40px] px-[15px] outline-none text-gray-300 text-[17px]`} 
                type={appear.confirmNewPassword ? 'text' : 'password'}
                placeholder='Current Password'
                onFocus={() => setFocusInput({currentPassword: false, newPassword: false, confirmNewPassword: true})}
                onBlur={() => setFocusInput((prev) => ({...prev, confirmNewPassword: false}))}
                value={valueInput.confirmNewPassword}
                onChange={(e) => handleInputChange('confirmNewPassword', e)}
              />
            </div>
            <div className={`${valueInput.confirmNewPassword === '' && checkSaving ? 'block' : 'hidden'} ml-[5px] pt-[3px] text-red-600 text-[14px]`}>
              Cannot be left blank
            </div>
            <div className={`${valueInput.confirmNewPassword === valueInput.newPassword ? 'hidden' : 'block'} ml-[5px] pt-[3px] text-red-600 text-[14px]`}>
                Password does not match with confirm password
              </div>
          </div>
        </div>
      </div>
      <div className='flex w-full justify-end px-[10px] gap-[20px] pb-[10px]'>
        <button 
            className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 ml-[60%] rounded-md'
            onClick={handleSaveChanges}
          >Save</button>
        <button 
            className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
            onClick={cancel}
          >Cancel</button>
      </div>
        
    </div>
  )
}

export default ChangePassword
