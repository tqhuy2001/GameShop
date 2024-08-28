import React from 'react'

const Banner = () => {
  return (
    <div className='w-full bg-white flex relative overflow-hidden'>
      <button onClick={null} className='absolute bg-gray-400'>Left</button>
      <button onClick={null} className='absolute bg-gray-400 right-[0%]'>Right</button>
      <div className='absolute w-full bg-green-500 right-[100%] flex justify-center'>asdf</div>
      <div className='w-full bg-red-500 flex justify-center'>asdf</div>
      <div className='absolute w-full bg-yellow-500 left-[100%] flex justify-center'>asdf</div>
    </div>
  )
}

export default Banner
