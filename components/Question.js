import React from "react"
import Answer from "./Answer"

export default function Question(props){
    
    function changeAnswer(aID){
        props.changeAnswer(props.id,aID,"selected")
    }
    
    const answerElements = props.info.answers.map((answer,index) =>{
        return (
            <Answer key={index+1000} answer={answer} changeAnswer={changeAnswer} />   
        )     
    })
    
    return(
        <div className="card">
           <h1> {props.info.question} </h1>
           <div className="answers">
            {answerElements}
           </div>
           <hr/>
        </div>
    )
}