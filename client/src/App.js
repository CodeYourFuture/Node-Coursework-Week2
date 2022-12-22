import './App.css';
import React, {useState, useEffect} from "react";
import PostMessage from './PostMessage';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    fetch("/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <PostMessage />
      {messages.map((message) => {
        return (
          <div>
            <p>From: {message.from}</p>
            <p>Message: {message.text}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
