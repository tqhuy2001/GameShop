import React from 'react'
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-50'>
      <div className='absolute w-full h-full opacity-40 bg-black' />
      <div className='absolute w-full h-full flex items-center justify-center text-white text-[50px]'>
        <ReactLoading type={'spokes'} color={'white'} height={50} width={50} />
      </div>
    </div>
  )
}

export default Loading