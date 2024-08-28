import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import switchboardAvt from '../assets/switchboard.jpg'

const Contact = () => {
  const [messageInput, setMessageInput] = useState('')
  const [message, setMessage] = useState([])

  const currentUser = useSelector(state => state.users.currentUser)

  useEffect(() => {
      const handleWsMessage = (event) => {
        const jsonData = JSON.parse(event.data)
        setMessage((prev) => ([jsonData, ...prev]))
      }
    
      currentUser.wsUser?.addEventListener("message", handleWsMessage);
    
      return () => {
        currentUser.wsUser?.removeEventListener("message", handleWsMessage);
      }
  })
  
  
  const handleChange = (event) => {
    setMessageInput(event.target.value)
  }

  const handleSubmit = () => {
    if(messageInput === '') return
    currentUser.wsUser?.send(messageInput)
    setMessageInput('')
  }
  
  return (
    <div className='w-full flex flex-col border h-[800px] border-gray-500 rounded-2xl text-gray-300'>
      <div className='w-full flex px-[20px] border-b border-gray-500 h-[90px] items-center'>
        <div className='rounded-full w-[65px] h-[65px] relative'>
          <div className='bg-zinc-950 absolute p-[3px] rounded-full w-[16px] h-[16px] right-[0%] bottom-[0%]'>
            <div className='bg-green-500 p-[3px] rounded-full w-full h-full'/>
          </div>
          <img className='rounded-full w-full h-full' src={switchboardAvt} alt='Switchboard avatar'/>
        </div>
        <div className='flex flex-col ml-[15px]'>
          <div className='text-[25px] font-bold'>Supported Staff</div>
          <div className='text-[14px] text-zinc-400 italic'>Usually reply in several minutes...</div>
        </div>
      </div>
      <div className='w-full min-h-[630px] max-h-[630px] flex flex-col-reverse px-[10px] gap-[10px] py-[15px] overflow-y-scroll'>
        {message.map((item, index) => (
          <div 
            key={index}
            className={`w-full gap-[5px] flex ${item.username == currentUser.dataUser?.username ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className='w-[20px] flex items-end pb-[5px]'>
              <img className='w-[20px] h-[20px] rounded-full' src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${item.avatar}`} alt='Avatar'/>
            </div>
            <div className={`select-text text-[18px] max-w-[400px] break-words border border-gray-500 ${item.username == currentUser.dataUser?.username ? 'bg-blue-600' : 'bg-zinc-950'} rounded-2xl px-[10px] py-[5px]`}>{item.content}</div>
          </div>
        ))}
      </div>
      <div className='w-full h-[80px] border-t border-gray-500 flex items-center'>
        <input 
          type='text'
          className='w-2/3 h-1/2 text-[18px] ml-[50px] border border-gray-500 rounded-full px-[15px] py-[2px] bg-zinc-950'
          value={messageInput}
          onChange={handleChange}
        />
        <button
          className='ml-[10px] bg-gray-500'
          onClick={handleSubmit}
        >Submit</button>
      </div>
    </div>
  )
}

export default Contact
