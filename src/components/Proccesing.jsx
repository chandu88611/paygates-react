import React, { useEffect, useState } from 'react'

function Proccesing() {
  const [text, setText] = useState("Initializing payment");

  useEffect(() => {
    const steps = [
      "Authorizing payment",
      "Initializing gateway",
      "Fetching payment status",
      "Retrieving transaction details",
      "Please wait"
    ];

    let stepIndex = 0;

    const updateText = () => {
      if (stepIndex < steps.length) {
        setText(steps[stepIndex]);
        stepIndex++;
      }
    };

    const timer = setInterval(updateText, 3000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className='fixed w-full top-0 left-0 h-full bg-[#f5f5f5f5] z-[2334]'>
        <div className='flex items-center gap-2  w-fit mx-auto mt-[50vh]'>
     <div class="loader">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
    <div class="bar4"></div>
    <div class="bar5"></div>
    <div class="bar6"></div>
    <div class="bar7"></div>
    <div class="bar8"></div>
    <div class="bar9"></div>
    <div class="bar10"></div>
    <div class="bar11"></div>
    <div class="bar12"></div>
</div>
<h1 className='text-4xl text-blue-500 animate-'>

        
</h1>

        </div>
        <div className='text-[] text-green-600 mx-auto px-2 py-1  w-fit flex items-center'>{text} <p className="loading text-2xl -mt-1"></p></div>
        </div>
  )
}

export default Proccesing