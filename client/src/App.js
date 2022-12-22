import React, { useState, useEffect } from 'react'
import './App.css';
import SendMessage from './components/SendMessage';

const App = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetch("/messages")
    .then((res) => res.json())
    .then((data) => setMessages(data))
    .catch((error) => console.error(error))
  }, [])
  return (
    <div className="App">
      <SendMessage messages={messages} setMessages={setMessages} />
      {messages.map((msg, index) => {
        return (
          <div>
            <p key={index}>{msg.text}</p>
            <p key={index + 1}>From: {msg.from}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
