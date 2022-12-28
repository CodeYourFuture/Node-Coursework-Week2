import React from "react";

const DeleteMessage = ({ message, messages, setMessages }) => {
  const handleDelete = () => {
    const id = message.id;
    fetch(`/messages/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
    let remainingMsgs = messages.filter((message) => message.id !== id);
    setMessages(remainingMsgs);
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteMessage;

// const DeleteMessage = () => {
//   const [removeMsg, setRemoveMsg] = useState([]);
//   const handleDelete = (id) => {
//     fetch(`/messages/${id}`, {
//       method: 'DELETE'
//     })
//       .then(res => res.json())
//       .then(data => {
//         setRemoveMsg(removeMsg.filter(item => item.id !== id));
//       })
//       .catch(error => console.error(error));
//   };
//   return (
//     <div>
//       {removeMsg.map(item => (
//         <div key={item.id}>
//           {item.name}
//           <button onClick={() => handleDelete(item.id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
