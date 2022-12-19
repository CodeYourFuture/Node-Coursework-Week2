import React, { useState } from "react";


const SendMessage = ({setMessages, messages}) => {
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");
  const submitNewMessage = () => {
    let message = { from: from, text: text };
    let tempArray = [...messages]
    tempArray.push(message)
    fetch("/messages", {
      method: "POST",
      body: JSON.stringify(message),
      headers: { "Content-Type": "application/json" },
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
    setMessages(tempArray)
  };
  return (
    <div>
      <form>
        <p>
          Name:{" "}
          <input
            onChange={(e) => setFrom(e.target.value)}
            type="text"
            name="from"
            placeholder="Your Name"
          />{" "}
          <br />
          Message:{" "}
          <input
            onChange={(e) => setText(e.target.value)}
            type="text"
            name="text"
            placeholder="The message..."
          />
          <br />
        </p>
        <button onClick={submitNewMessage} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
