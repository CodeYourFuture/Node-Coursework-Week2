import React, { useState, useEffect } from "react";

const AllMessages = () => {
  const [messages, setMessages] = useState([]);
  const [enteredMsg, setEnteredMsg] = useState(false);

  useEffect(() => {
    fetch("/messages")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMessages(data);
        setEnteredMsg(false);
      });
  }, [enteredMsg]);

  return (
    <div>
      {messages.map((message) => (
        <div>
          <p>{message.from}</p>
          <p>{message.text}</p>
        </div>
      ))}
      <button onClick={() => setEnteredMsg(true)}>All Messages</button>
    </div>
  );
};

export default AllMessages;
