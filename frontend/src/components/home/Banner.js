import React, { useState } from 'react'
import styles from '../../mystyle.module.css'

const Banner = () => {
  const [currentBanner, setCurrentBanner] = useState([1, 2, 3])

  const handleLeftSurfing = () => {

  }
  const handleRightSurfing = () => {
    
  }

  return (
    <div className='w-full bg-white flex relative overflow-hidden h-[300px] items-center'>
      <button onClick={handleLeftSurfing} className='absolute bg-gray-400'>Left</button>
      <button onClick={handleRightSurfing} className='absolute bg-gray-400 right-[0%]'>Right</button>
      {currentBanner.map((item, index) => (
        index == 0 ? <div className='absolute w-full bg-green-500 items-center -left-[100%] flex justify-center h-full'>{item}</div> :
        index == 1 ? <div className={`w-full bg-red-500 flex justify-center items-center h-full ${styles.banner_left_surfing}`}>{item}</div> :
        index == 2 ? <div className='absolute w-full bg-yellow-500 left-[100%] flex items-center justify-center h-full'>{item}</div> : null
      ))}
    </div>
  )
}

export default Banner
