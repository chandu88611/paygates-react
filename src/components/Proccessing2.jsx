import React, { useEffect, useState } from 'react'

function Proccesing2() {
  const [text, setText] = useState("Loading");

  return (
    <div className='fixed w-full top-0 left-0 h-full bg-[#f5f5f5f5] z-[2334]'>
        <div className='flex items-center gap-2  w-fit mx-auto mt-[50vh]'>
     <div className="loader">
    <div className="bar1"></div>
    <div className="bar2"></div>
    <div className="bar3"></div>
    <div className="bar4"></div>
    <div className="bar5"></div>
    <div className="bar6"></div>
    <div className="bar7"></div>
    <div className="bar8"></div>
    <div className="bar9"></div>
    <div className="bar10"></div>
    <div className="bar11"></div>
    <div className="bar12"></div>
</div>
<h1 className='text-4xl text-blue-500 animate-'>   
</h1>
        </div>
        <div className='text-[] text-green-600 mx-auto px-2 py-1  w-fit flex items-center'>{text} <p className="loading text-2xl -mt-1"></p></div>
        </div>
  )
}

export default Proccesing2