import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import SendMessage from './SendMessage';

function App() {
  const [messages, setMessages] = useState([])
  useEffect(()=>{
    fetch("/messages")
    .then((res) => res.json())
    .then((data) => setMessages(data))
    .catch((error) => console.error(error))
  },[])

  return (
    <div className="App">
      <SendMessage setMessages={setMessages} messages={messages}/>
      {messages.map(message=>{
        return (
          <div>
            <p>{message.text}</p>
            <p>From: {message.from}</p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
