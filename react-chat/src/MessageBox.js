import React from "react";

const MessageBox = (props) => {
  return (
    <div>
      <p>{props.message.from}</p>
      <p>{props.message.text}</p>
    </div>
  );
};

export default MessageBox;
