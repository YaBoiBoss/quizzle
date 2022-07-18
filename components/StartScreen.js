import React from "react"

export default function StartScreen(props){
    return(
        <div className="start-screen">
            <h1>Quizzical</h1>
            <p>Online quiz made to practise all the skills I've learned so far</p>
            <button className = "start--button" onClick={()=>props.setFirstTime(false)}>Start quiz</button>
        </div>
    )
}