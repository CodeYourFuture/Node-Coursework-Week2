import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import "../../style/message.css";
const Message = ({ item }) => {
  const context = useContext(UserContext);

  return (
    <div className="message_cont">
      <h4>
        {item.from}{" "}
        <span
          className="remove_btn"
          onClick={() => context.removeHandler(item.id)}
        >
          Delete
        </span>
        <span
          className="remove_btn"
          onClick={() => {
            context.setUserHandler(item);
          }}
        >
          Edit
        </span>
      </h4>
      <p className="message_text">{item.text}</p>
      <h6 className="message_details">{item.date}</h6>
    </div>
  );
};

export default Message;
