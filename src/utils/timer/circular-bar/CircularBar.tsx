import React, { useEffect, useState } from 'react'
import './CircularBar.css'
const CircularBar = ({widthPercentage}:any) => {

  const [offset, setOffset] = useState(311)

  useEffect(()=>{
    const newOffset = 628 - widthPercentage*5.28;
    setOffset(newOffset);
  },[widthPercentage])

  return (
    <div>
      <div className='bar-inner-wrapper'>
      {/* <svg  width={"160px"} height={"160px"}>
        <circle cx="80" cy="80" r="70" strokeLinecap='round' 
        style={{
          'strokeDashoffset':'150'
        }}></circle>
        </svg> */}
        
        <svg  width={"220px"} height={"220px"}>
        <circle className='circle-cover' cx="110" cy="110" r="100" strokeLinecap='round' 
        style={{
          'strokeDashoffset':'100'
        }}></circle>
        <circle className='circle-actual' cx="110" cy="110" r="100" strokeLinecap='round' 
        style={{
          'strokeDashoffset':`${offset}`
        }}></circle>
        </svg>
      </div>
    </div>
  )
}
//472 - x% (322)
export default CircularBar