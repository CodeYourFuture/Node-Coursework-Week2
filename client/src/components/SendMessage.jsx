import React, { useState } from "react";

const SendMessage = ({ messages, setMessages }) => {
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
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error))
    setMessages(tempArray)
  };
  return (
    <div>
      <h2> Send Message</h2>
      <form>
        <p>
          Name:{" "}
          <input
            type="text"
            name="from"
            placeholder="Your Name"
            onChange={(e) => setFrom(e.target.value)}
          />{" "}
          <br />
          Message:{" "}
          <input
            type="text"
            name="text"
            placeholder="The message..."
            onChange={(e) => setText(e.target.value)}
          />
          <br />
        </p>
        <button type="submit" onClick={submitNewMessage}>
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
