import React from "react"
import Question from "./Question"

export default function MainScreen(props){
    const [questions,setQuestions] = React.useState([])
    const [moreQuestions,setMoreQuestions] = React.useState(false)
    const [correct,setCorrect] = React.useState(-1)
    
    React.useEffect(()=>{
        fetch("https://opentdb.com/api.php?amount=5")
        .then(res => res.json())
        .then(data => {
            const newArr = data.results.map(question => {
                const newQuestion = {
                    question: question.question.replace(/&quot;/g,'"').replace(/&#039;/g,"'"),
                    answers: [...question.incorrect_answers],
                    correct: question.correct_answer
                }
                newQuestion.answers.splice(Math.floor(Math.random()*newQuestion.answers.length),0,newQuestion.correct)
                
                newQuestion.answers = newQuestion.answers.map((answer,index) => (
                    {
                        value: answer,
                        state: "",
                        id:index,
                        selected: null
                    }
                ))
                return newQuestion
            })
            setQuestions(newArr)
        })
        setCorrect(-1)
    },[moreQuestions])
    
    function changeAnswer(qID,aID){
        if(!(correct<0)) return
        setQuestions(prevQuestions => {
            return prevQuestions.map((question,i)=>{
                if(i == qID){
                    question.answers.forEach(answer=>{
                        if(answer.id==aID){
                            answer.state = "selected"
                            question.selected = answer.value
                        }else{
                            answer.state = ""
                        }
                    })
                    return question
                }else{
                    return question
                }
            })
        })
    }
    
    const questionElements = questions.map((question,index) => (
        <Question key={index} info={question} changeAnswer={changeAnswer} id={index} />)
    )
        
    function handleSubmit(){
        let cor = 0
        questions.every(question => {
           question.selected==question.correct && (cor+=1)
           question.answers.every(answer=>{
               if(answer.value==question.selected && answer.value!=question.correct){
                   answer.state = "red"
               }else if(answer.value==question.correct){
                   answer.state = "green"
               }
               return true
           })
           return true  
        })
        setCorrect(cor)
    }
    
    
    return(
        <main>
            {questionElements}
            {correct<0 ? <button onClick={handleSubmit} className="submit">Check Answers</button>
            : (<div className="result">
                <p>You scored {correct}/5 correct answers</p>
                <button className="submit" onClick={()=>setMoreQuestions(prev=>!prev)} >Play again</button>
             </div>)}
        </main>
    )
    
}