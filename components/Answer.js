import React from "react"

export default function Answer(props){
    return(
        <button onClick={()=>props.changeAnswer(props.answer.id)} 
        className={"answer "+(props.answer.state || "")} >
        {props.answer.value}</button>
    )
}