
const AddMessage = ({
  name,
  setName,
  text,
  setText,
  isNewMessage,
  selectedMessage,
  messages,
  setMessages,
  setIsNewMessage
}) => {
  const handleSubmit = () => {
    if (isNewMessage) {
      let requestBody = {
        from: name,
        text: text,
      };
      fetch("/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    } else {
      const id = selectedMessage.id;
      const updatedMessage = {
        from: name,
        text: text,
      };
      fetch(`/messages/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMessage),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));

      const allMessages = messages.map((val) =>
        val.id === id ? (val = updatedMessage) : val
      );
      setMessages(allMessages);
      setIsNewMessage(true);
    }
  };

  return (
    <div>
      <form className="send-text">
        <div className="send-input">
          {/* <label></label> */}
          <input
            placeholder="Write your name"
            value={name}
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <div className="text-area">
            {/* <label></label> */}
            <input
              placeholder="Write your message"
              value={text}
              onChange={(e) => setText(e.target.value)}
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
