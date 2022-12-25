import React, { useState, useEffect } from "react";
import DeleteMessage from "./buttons/DeleteMessage";
import EditMessage from "./buttons/EditMessage";
// import AllMessages from './buttons/AllMessages';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }, []);
  return (
    <div className="dly-msg">
      {messages.map((message) => (
        <div className="message-content">
          <div>
            <p>{message.timeSent}</p>
            <p>{message.from}</p>
            <p>{message.text}</p>
          </div>
          <div className="msg-btn">
            <EditMessage />
            <div>
              <DeleteMessage />
            </div>
          </div>
        </div>
      ))}

      {/* <AllMessages />
      <div className='msg-btn'>
        <button>Edit</button>
        <div>
          <button>Delete</button>
        </div>
      </div> */}
    </div>
  );
};

export default MessageList;
