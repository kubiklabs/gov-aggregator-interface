import React from "react";
import './loadingSpinner.css'

const LoadingSpinner = (props: {style: any})=>{

    return <div style={props.style} className="loader">Loading...</div>
}

export default LoadingSpinner;