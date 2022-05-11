import React, { useContext } from "react";
import Message from "./Message";
import UserContext from "../../context/UserContext";
import "../../style/messages.css";
const Messages = () => {
  const context = useContext(UserContext);

  return (
    <article className="messages_cont">
      <div className="messages_header">
        <a href="https://linktr.ee/uaral" style={{ display: "block" }}>
          <img
            className="contact_logo"
            src="/img/ali.png"
            alt="contact me link"
          ></img>
          <span>Contact:</span>
        </a>
        <button
          className="messages_btn"
          onClick={() => context.setShowMessages(!context.showMessages)}
        >
          {context.showMessages ? "Hide Messages" : "Show Messages"}
        </button>
      </div>

      {context.showMessages && (
        <section className="messages_section">
          {context.messages.length !== 0 ? (
            context.messages.map((item, index) => (
              <Message key={index} item={item}></Message>
            ))
          ) : (
            <h1 style={{ color: "white" }}>No messages to show! :(</h1>
          )}
        </section>
      )}
    </article>
  );
};

export default Messages;
