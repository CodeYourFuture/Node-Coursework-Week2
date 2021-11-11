import React, { useState, useEffect} from "react";
import BoxChat from "./BoxChat";

function InputChat() {
 
 const [name, setName] = useState("");
 const [message, setMessage] = useState("")
 const [count, setCount] = useState(0);
 const submitChatHandler = (e) => {
  e.preventDefault()
  console.log("Sending data to server")
  fetch("http://localhost:4002/messages", {
   method: "POST",
   body: JSON.stringify({
    //id: 0,
    from: name,
    text: message
   }),
   headers: {
    "Content-Type": "application/json"
   }
  });
  setName(() => "");
  setMessage(() => "");
  setCount(() => count +1)
 }

  return (
    <div>
      <form onSubmit={submitChatHandler}>
        <p>
          Name:{" "}
          <input
            type="text"
            name="from"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(() => e.target.value)}
          />{" "}
          <br />
          Message:{" "}
          <input
            type="text"
            name="text"
            placeholder="The message..."
            value={message}
            onChange={(e) => setMessage(() => e.target.value)}
          />
          <br />
        </p>
        <button type="submit">Send</button>
      </form>
      <a href="http://localhost:4002/messages" target="_blank">
        See all messages
      </a>
      <BoxChat count={count}/>
    </div>
  );
}

export default InputChat;
