import React,{useState, useEffect} from "react"
import MessageBox from './MessageBox';

const ShowMessages = ()=>{
const [messages, setMessages] = useState([])

useEffect( ()=>{
    fetch("https://roxana-chat-server.herokuapp.com/messages/")
    
    .then(data => data.json())
    .then(data => setMessages(data))
}, [messages]
)

return (
    <div className="messages">
       {messages.map(message => <MessageBox message={message} /> )} 
        
    </div>
)
}

export default ShowMessages