import React from 'react'
import { FaArrowUp } from "react-icons/fa6";

function Landing() {
  return (
    <div className='w-full h-screen bg-zinc-900 pt-2'>
      <div className='textstructure mt-52 px-20'>
        {["We create", "eye opening", "presentations"].map((item, index) => (
          <div key={index} className='masker'>
            <div className="w-fit flex items-center overflow-hidden">
              {index ===1 && (
                <div className="w-[7vw] rounded-md h-[5vw] relative bg-[url('https://ochi.design/wp-content/uploads/2022/04/content-image01.jpg')] bg-cover ">

                </div>)}
            <h1 className=" flex items-center uppercase text-[7vw] leading-[6vw] tracking-tighter font-['Founders_Grotesk_X-Condensed] font-bold">
              {item}
            </h1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex border-t-[1px] border-zinc-800 mt-20 justify-between items-center py-5 px-20">
        {["Presentation and storytelling agency", "from innovation teams and global brands"].map((item, index) => (
          <p key={index} className="text-md font-light tracking-tight leading-none">
            {item}
          </p>
        ))}

        <div className="start flex items-center gap-5">
          <div className="px-5 py-2 border-[2px] border-zinc-500 font-light text-md uppercase  rounded-full flex items-center gap-3">
            <div className="w-10 h-10 border-[2px] border-zinc-500 flex justify-center items-center rounded-full">
              <span className='rotate-45'><FaArrowUp /></span>
            </div>s
            Start the project
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
