import React from 'react'
import icons from '../../utils/icons'
import { useNavigate } from 'react-router-dom'
import truncParagraph from '../../utils/truncParagraph'

const GameCard = (props) => {
    const item = props.data
    const bought = props.bought
    const MdOutlineDownloadDone = icons.MdOutlineDownloadDone
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/search-game/${item.id}`)
    }

    return (
        <div 
            className={`flex flex-col z-50 bg-zinc-800 rounded-lg w-full select-none h-[300px] transition ease-in-out hover:scale-110 cursor-pointer border border-opacity-50 border-gray-400`} 
            onClick={handleClick}>
                <div className='rounded-t-lg w-full h-[160px]'>
                    <img className='rounded-t-lg w-full h-full' src={item?.main_image} alt='GameCard'/>
                </div>
                <div className='flex flex-col justify-between px-[10px] pt-[8px] pb-[3px] h-[140px]'>
                    <div>
                        <div className='text-[15px] text-white font-bold tracking-wide'>{item.name}</div>
                        <div className='text-[13px] text-gray-500 mt-[3px] w-full h-full'>{truncParagraph(item.description, 60)}</div>
                    </div>
                    <div className='flex justify-between'>
                        <div className='text-[13px]'>
                            <div className='flex'>
                                <div className='text-gray-500'>By</div>
                                <div className='text-orange-500 ml-[5px]'>{item.user_created_name}</div>
                            </div>
                            <div className='text-gray-500'>At {item.create_at.slice(0, 10)}</div>
                        </div>  
                        {bought === true
                        ? (<div className='flex flex-col text-[14px] text-green-500 justify-end'>
                            <div className='flex'>
                                <MdOutlineDownloadDone size={19} />
                                BOUGHT
                            </div>
                        </div>)
                        : (<div className='flex flex-col text-[14px] text-gray-400 justify-end'>{item.price === 0 ? 'FREE' : '$' + item.price}</div>)}
                    </div>
                </div>
        </div>
    )
}

export default GameCard
