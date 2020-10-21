import React, { useState } from "react";


const MessagePost = () => {
  const [nickname, setNickname] = useState("");
  const [messageInput, setMessageInput] = useState("");

  function handleName(e) {
    setNickname(e.target.value);
  }

  function handleMessage(e) {
    setMessageInput(e.target.value);
    console.log(messageInput);
  }

  function handlePost(e) {
    e.preventDefault();
    const data = {
      from: nickname,
      text: messageInput,
    };

    fetch("https://roxana-chat-server.herokuapp.com/messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setNickname("")
    setMessageInput("")
  }

  return (
    <div>
      <form className="submit-form"> 
        <label for="name">Nickname</label>
        <input type="text" id="name" value={nickname} onChange={handleName} />
        <label for="message">Your message</label>
        <textarea
          type="text"
          id="message"
          rows="10" cols="40"
          value={messageInput}
          onChange={handleMessage}
        />
        <button type="submit" onClick={handlePost} >
          Send
        </button>
      </form>
    </div>
  );
};

export default MessagePost;
