import React, { useEffect } from "react";
import DeleteMessage from "./buttons/DeleteMessage";
import EditMessage from "./buttons/EditMessage";
// import AllMessages from './buttons/AllMessages';

const MessageList = ({
  messages,
  setMessages,
  setName,
  setText,
  setIsNewMessage,
  setSelectedMessage,
}, index) => {
  useEffect(() => {
    fetch("/messages")
      .then((res) => res.json())
      .then((data) => {
        setMessages(data);
      });
  }, [setMessages]);
  return (
    <div className="dly-msg">
      {messages.map((message) => (
        <div key={message.id} className="message-content">
          <div key={index}>
            <p>{message.timeSent}</p>
            <p>{message.from}</p>
            <p>{message.text}</p>
          </div>
          <div className="msg-btn">
            <EditMessage
              message={message}
              setName={setName}
              setText={setText}
              setIsNewMessage={setIsNewMessage}
              setSelectedMessage={setSelectedMessage}
            />
            <div>
              <DeleteMessage
                message={message}
                setMessages={setMessages}
                messages={messages}
              />
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
