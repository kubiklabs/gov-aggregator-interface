import React, {useState, useEffect} from 'react';
import { useTimer } from 'react-timer-hook';
import CircularBar from './circular-bar/CircularBar'

const Timer=({ timerWrapperClass, expiryTimestamp,wrapperClassName, counterContainerClass, counterWrapperClass,
  daysCounterClass, hoursCounterClass, minutesCounterClass,secondsCounterClass,
   circularBar=false, inlineTag=false, barClassName, totalTime, onExpire=()=>{} }:any)=> {
  const {
    seconds,
    minutes,
    hours,
    days
  } = useTimer({ expiryTimestamp, onExpire });

  const [widthPercentage, setWidthPercentage] = useState(0);

  useEffect(()=>{
    const width = ( ( 1-( ( (days*24+hours)*60+minutes )*60+seconds )/totalTime )*100 );
    setWidthPercentage(width);
  },[seconds])

  return (
    <div className={timerWrapperClass} style={{textAlign: 'center'}}>
      <div className={counterContainerClass}>
      <div className={counterWrapperClass} style={{fontSize: '1.2rem'}}>
        
        <span className={daysCounterClass}>{days<10?'0'+days:days}{inlineTag&&<span className='time-hand'> {days!==1?'DAYS':'DAY'} </span>}:</span>
        <span className={hoursCounterClass}>{hours<10?'0'+hours:hours}{inlineTag&&<span className='time-hand'> H </span>}:</span>
        <span className={minutesCounterClass}>{minutes<10?'0'+minutes:minutes}{inlineTag&&<span className='time-hand'> M </span>}:</span>
        <span className={secondsCounterClass}>{seconds<10?'0'+seconds:seconds}{inlineTag&&<span className='time-hand'> S</span>}</span>
      </div>
      </div>
      {circularBar?<CircularBar widthPercentage={widthPercentage}/>:
      <div className={wrapperClassName}>
           <div style={{'width':`${widthPercentage}%`}} className={barClassName}></div>
           </div> }
    </div>
  );
}

export default Timer;