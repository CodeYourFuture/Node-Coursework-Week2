import React from "react";

const EditMessage = ({
  message,
  setName,
  setText,
  setIsNewMessage,
  setSelectedMessage,
}) => {
  const updateMessage = () => {
    setSelectedMessage(message);
    setIsNewMessage(false);
    setName(message.from);
    setText(message.text);
  };

  return (
    <div msg-btn>
      <button onClick={updateMessage}>Edit</button>
    </div>
  );
};

export default EditMessage;
