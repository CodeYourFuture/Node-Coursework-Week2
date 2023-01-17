import React from "react";
import { useState, useEffect } from "react";
import MessageCard from "./MessageCard";

function MessagesList() {
  const [messages, setMessages] = useState([""]);

  useEffect(() => {
    fetch(`/messages?_sort=id&_sort=DESC`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);
//setMessages(data.sort((a,b)=>b-a))
  return (
    <div>
      {messages.map((message) => (
        <MessageCard
          key={message.id}
          from={message.from}
          text={message.text}
          time={message.time}
        />
      ))}
    </div>
  );
}

export default MessagesList;
