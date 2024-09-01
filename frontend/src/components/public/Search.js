import React, { useState, useEffect, useRef } from 'react'
import icons from '../../utils/icons'
import { useSelector } from 'react-redux'
import truncParagraph from '../../utils/truncParagraph'
import { useNavigate } from 'react-router-dom'

const CiSearch = icons.CiSearch

const Search = () => {
  const charMin = 1
  const inputRef = useRef(null)
  const allGames = useSelector(state => state.games.allGames.data)
  const [searchWord, setSearchWord] = useState('')
  const [displayList, setDisplayList] = useState(false)
  const [list, setList] = useState([])
  const navigate = useNavigate()
  const [searchItems, setSearchItems] = useState(5)

  const handleClickGame = (gameId) => {
    const inputElements = document.getElementById('input')
    inputElements.value = ''
    setDisplayList(false)
    navigate(`/search-game/${gameId}`)
  }
  
  const handleChange = (event) => {
    setSearchWord(event.target.value)
  }
  const handleFocus = () => {
    if(searchWord.length >= charMin && !displayList) setDisplayList(true)
    if(searchWord.length < charMin && displayList) setDisplayList(false)
  }
  useEffect(() => {
    function addToList() {
      allGames?.map(item => {
        const nameUp = item.name.toUpperCase()
        const wordUp = searchWord.toUpperCase()
        if(wordUp !== '') {
          if(nameUp.includes(wordUp) && !list.includes(item)) {
            setList(prev => [...prev, item])
          }
          if(!nameUp.includes(wordUp) && list.includes(item)) setList(prev => prev.filter(e => e !== item))
        }})
    }
    addToList()
    if(searchWord.length >= charMin && !displayList) setDisplayList(true)
    if(searchWord.length < charMin && displayList) setDisplayList(false)
  }, [searchWord])

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setDisplayList(false)
    }
  }

  const handleClickMore = () => {
    searchItems + 5 < list.length ? setSearchItems(searchItems + 5) : setSearchItems(list.length)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className='h-[38px] w-[600px] flex relative items-center'>
        <span className='absolute ml-[8px] flex items-center justify-center text-slate-600 z-[11]'>
            <CiSearch size={24}/>
        </span>
        <input
          id='input'
          ref={inputRef}
          className='px-3 pl-[35px] border-2 border-gray-600 rounded-3xl text-[16px] z-10 w-full h-full outline-none bg-gray-300 text-slate-900 placeholder-slate-600' 
          type='text' 
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder='Search game...'>
        </input>
        <div ref={inputRef} className={`overflow-y-scroll max-h-[300px] flex flex-col px-[5px] pt-[25px] top-[20px] w-full rounded-b-lg absolute bg-gray-300 border-b-2 border-l-2 border-r-2 border-gray-600 ${displayList ? 'block' : 'hidden'}`}>
            {list.map((item, index) => (index < searchItems ? (
              <div 
                key={index}
                className='flex hover:bg-zinc-400 cursor-pointer px-[3px] py-[2px] items-center mb-[3px]'
                onClick={() => handleClickGame(item.id)}>
                  <img className='w-[50px] h-[40px] mr-[5px]' src={item?.main_image}/>
                  <div className='w-full flex flex-col'>
                    <div className=''>{item.name}</div>
                    <div className='text-gray-600 text-[13px]'>{truncParagraph(item.description, 70)}</div>
                  </div>
              </div>
            ) : null))}
            {list.length === 0 ? <div className='w-full flex justify-center italic text-[15px] text-gray-500'>No result matches to search</div> : null}
            <div 
              className={`flex text-gray-600 hover:underline cursor-pointer justify-center text-[15px] ${searchItems >= list.length ? 'hidden' : 'block'}`}
              onClick={handleClickMore}
            >More...</div>
        </div>
    </div>
  )
}

export default Search
