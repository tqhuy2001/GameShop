import React from 'react'
import icons from '../utils/icons'

const CiSearch = icons.CiSearch

const Search = () => {
  return (
    <div className='h-[40px] w-[550px] flex items-center'>
        <span className='absolute ml-[8px] flex items-center justify-center text-slate-700'>
            <CiSearch size={24}/>
        </span>
        <input className='px-3 pl-[35px] border-2 border-gray-600 rounded-3xl text-[16px] w-full h-full outline-none bg-gray-300 text-slate-700' type='text' placeholder='Search game...'/>
    </div>
  )
}

export default Search
