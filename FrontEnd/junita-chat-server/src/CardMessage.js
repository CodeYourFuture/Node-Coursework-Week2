import React, { useEffect, useState } from "react";

import MessageBox from "./Message";

function CardMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("https://junita-chat-server.glitch.me/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => console.error("Error fetching messages:", error));
  }, []);

  const handleCreateMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div>
      <img
        src="https://www.simplyconnectsolutions.co.uk/wp-content/uploads/2021/07/Simply-300x300.png"
        alt="logo"
      ></img>
      <h2>Chat-server</h2>

      <>
        <ul>
          {messages.map((message) => {
            return (
              <li className="message_list" key={message.id}>
                {message.from} -{message.text}
              </li>
            );
          })}
        </ul>
      </>

      <MessageBox props={handleCreateMessage} />
    </div>
  );
}

export default CardMessages;
