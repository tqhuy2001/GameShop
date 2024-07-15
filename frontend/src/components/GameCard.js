import React from 'react'

export const GameCard = (props) => {
  const item = props.data
  return (
    <div className='flex flex-col z-50 bg-zinc-800 rounded-lg w-full h-[300px] transition ease-in-out hover:scale-110 cursor-pointer border border-opacity-50 border-gray-400'>
      <img className='rounded-t-lg w-full h-[160px]' src={`${process.env.REACT_APP_SERVER_URL}${process.env.REACT_APP_GET_IMAGE}${item.main_image}`}/>
      <div className='flex flex-col justify-between px-[10px] pt-[8px] pb-[3px] h-[140px]'>
        <div>
          <div className='text-[15px] text-white font-bold tracking-wide'>{item.name}</div>
          <div className='text-[13px] text-gray-500 mt-[3px]'>{item.description}</div>
        </div>
        <div className='flex justify-between'>
          <div className='text-[13px]'>
            <div className='flex'>
              <div className='text-gray-500'>By</div>
              <div className='text-orange-500 ml-[5px]'>{item.user_created_name}</div>
            </div>
            <div className='text-gray-500'>At {item.create_at.slice(0, 10)}</div>
          </div>
          <div className='flex flex-col text-[14px] text-gray-400 justify-end pb-[5px]'>{item.price === 0 ? 'FREE' : '$' + item.price}</div>
        </div>
      </div>
    </div>
  )
}
