import React, { useState } from "react";

const AddMessage = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    let requestBody = {
      from: name,
      text: message,
    };
    fetch("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form className="send-text">
        <div className="send-input">
          <label></label>
          <input placeholder="Write your name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <div className="text-area">
            <label></label>
            <input placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              type="text"
            ></input>
          </div>
        </div>
        <button onClick={handleSubmit} type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default AddMessage;
