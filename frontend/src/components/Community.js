import React, { useEffect, useState } from 'react'

const Community = () => {
  const [widthwindow, setWidthWindow] = useState(window.innerWidth)

  useEffect(() => {
    function updateSize() {
      setWidthWindow(window.innerWidth)
    }
    window.addEventListener("resize", updateSize)
  })
  
  return (
    <div className={`flex flex-col items-center rounded-lg border border-gray-500 w-[350px] h-[810px] text-gray-300 ${widthwindow > 1400 ? 'block' : 'hidden'}`}>
      Community
    </div>
  )
}

export default Community
