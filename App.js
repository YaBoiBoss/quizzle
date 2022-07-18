import React from "react"
import StartScreen from "./components/StartScreen"
import MainScreen from "./components/MainScreen"

export default function App(){
    
    const [firstTime,setFirstTime] = React.useState(true)
    
    return(
        <div>
            <img src="https://i.imgur.com/bJpjoz0.png" className = "top-blob" />
            <img src="https://i.imgur.com/67AZdOT.png" className = "bottom-blob" />
            {firstTime 
            ? <StartScreen setFirstTime={setFirstTime}/> 
            : <MainScreen />}        
        </div>
    )
}