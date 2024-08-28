import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import icons from '../../../../utils/icons'
import Avatar from 'react-avatar-edit'
import * as apis from '../../../../apis'

const UpdateAvatar = ({ cancel }) => {
  const [hoverAvatar, setHoverAvatar] = useState(false)
  const [modifyAvatar, setModifyAvatar] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [reportSuccess, setReportSuccess] = useState(false)

  const FaImages = icons.FaImages
  const SiTicktick = icons.SiTicktick

  const avatar = useSelector(state => state.users.currentUser.dataUser.avatar)
  const [avatarDisplay, setAvatarDisplay] = useState(`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${avatar}`)

  const handleUpload = () => {
    setModifyAvatar(true)
  }

  const handleConfirm = () => {
    if(previewImage !== null) {setAvatarDisplay(previewImage)}
    setModifyAvatar(false)
  }

  const handleCrop = (previewImage) => {
    setPreviewImage(previewImage)
  }
  
  const handleSaveAvatar = async () => {
    if(avatarDisplay != `${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${avatar}`) {
      const binaryData = atob(avatarDisplay.split(',')[1])
       const arrayBuffer = new Uint8Array(binaryData.length)

      for(let i = 0; i < binaryData.length; i++) {
        arrayBuffer[i] = binaryData.charCodeAt(i)
      }

      const blob = new Blob([arrayBuffer], {type: 'image/png'})
      const file = new File([blob], 'avatar.png', {type: 'image/png'})
      
      try {
        const response = await apis.updateAvatar(file)
        setReportSuccess(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleReload = () => {
    setReportSuccess(false)
    window.location.reload()
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${reportSuccess ? 'block' : 'hidden'}`}>
        <div className='flex flex-col h-[200px] w-auto bg-zinc-900 rounded-xl border border-gray-500 text-gray-300 items-center justify-between'>
          <div className='flex flex-col w-full items-center'>
            <div className='font-bold text-[25px] mt-[15px] px-[20px]'>Updated avatar successfully</div>
            <SiTicktick className='text-green-500 mt-[20px]' size={40}/>
          </div>
          <div className='flex w-full justify-center px-[10px] gap-[40px] pb-[10px]'>
            <button 
                className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-opacity-70 rounded-md bg-blue-600'
                onClick={handleReload}
              >OK</button>
          </div>
        </div>
      </div>
      <div className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50 bg-black bg-opacity-40 ${modifyAvatar ? 'block' : 'hidden'}`}>
        <div className='flex flex-col h-[500px] w-auto bg-zinc-900 rounded-xl border border-gray-500 text-gray-300 items-center justify-between'>
          <div className='w-full h-full flex flex-col'>
            <div className='w-full px-[5px]'>
              <div className='w-full border-b border-gray-500 flex justify-center font-bold text-[20px] py-[5px]'>Modify Avatar</div>
            </div>
            <div className='relative flex justify-center'>
              <Avatar
                s
                height={400}
                label='Choose image file'
                labelStyle={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '700'}}
                onCrop={handleCrop}
                onClose={() => setPreviewImage(null)}
              />
            </div>
          </div>
          <div className='flex w-full justify-center px-[10px] gap-[40px] pb-[10px]'>
            <button 
                onClick={handleConfirm}
                className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
              >OK</button>
            <button 
                className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
                onClick={() => setModifyAvatar(false)}
              >Cancel</button>
          </div>
        </div>
      </div>
      <div className='w-full h-full flex flex-col items-center pt-[30px]'>
        <div className='w-[300px] h-[300px] rounded-full relative' onMouseEnter={() => setHoverAvatar(true)} onMouseLeave={() => setHoverAvatar(false)}>
          <div 
            className={`w-full flex justify-center items-center h-full rounded-full bg-black bg-opacity-20 cursor-pointer absolute ${hoverAvatar ? 'block' : 'hidden'}`}
            onClick={handleUpload}>
              <FaImages size={50}/>
          </div>
          <img className='w-full h-full rounded-full' src={avatarDisplay} alt='current-avatar'/>
        </div>
        <div className='italic text-[14px] mt-[45px]'>Click on the avatar to change</div>
        <div className='italic text-[14px]'>After saving changes. Page will be reloaded itsself to confirm new updates</div>
      </div>
      <div className='flex w-full justify-end px-[10px] gap-[20px] pb-[10px]'>
        <button 
            className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
            onClick={handleSaveAvatar}
          >Save</button>
        <button 
            className='min-w-[100px] h-[30px] border border-gray-500 hover:bg-white hover:bg-opacity-5 rounded-md'
            onClick={cancel}
          >Cancel</button>
      </div>
    </div>
  )
}

export default UpdateAvatar