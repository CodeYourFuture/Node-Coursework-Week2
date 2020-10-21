import React from "react";

const MessageBox = (props) => {
  return (
    <div className="one-message">
      <p className="message-from">{props.message.from}</p>
      <p >{props.message.text}</p>
    </div>
  );
};

export default MessageBox;
