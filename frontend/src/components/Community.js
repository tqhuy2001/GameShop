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
    <div className={`flex flex-col items-center rounded-lg border border-white w-[350px] h-[810px] ${widthwindow > 1340 ? 'block' : 'hidden'}`}>
      Community
    </div>
  )
}

export default Community
