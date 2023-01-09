import React, { useState } from 'react'


const PostMessage = ({setMessages, messages}) => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit() {
        let requestBody = {
            from: name,
            text: message
        }
        let allMessages = [...messages, requestBody];
        console.log(requestBody);
        fetch("/messages", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestBody)
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setMessages(allMessages);
        })
        .catch((error) => console.log(error))
    }
  return (
    <div>
      <h2>Post Message</h2>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="message">Message</label>
      <input
        id="message"
        type="text"
        value={message}
        placeholder="Enter the message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default PostMessage;