const Delete = ({msgId}) => {
  const onButtonClick = () => {
    console.log(msgId)
    fetch("https://junita-chat-server.glitch.me/messages/"+ msgId, {
      method: "Delete",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))

      .catch((error) => console.error("Error fetching messages:", error));
  };

  return (
    <div>
      <button onClick={onButtonClick}>Delete</button>
    </div>
  );
};

export default Delete;
