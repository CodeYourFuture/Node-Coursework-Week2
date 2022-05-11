import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { v4 as uuidv4 } from "uuid";
const Context = ({ children }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [data, setData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [textErrorMessage, setTextErrorMessage] = useState("");
  const [nameSearch, setnameSearch] = useState("");
  const [searchErrorMessage, setSearchErrorMessage] = useState("");

  useEffect(() => {
    fetch("https://cyf-ali-jahankah-chat-server.glitch.me/")
      .then((res) => res.json())
      .then((all) => {
        setData(all);
        setMessages(all);
      });
  }, []);
  useEffect(() => {
    fetch("https://cyf-ali-jahankah-chat-server.glitch.me/")
      .then((res) => res.json())
      .then((all) => {
        setMessages(all);
      });
  }, [data]);

  const inputHandler = (event, num) => {
    let myValue = event.target.value.replace("  ", " ");
    if (num === 100) {
      if (myValue.length >= 100 && event.key !== "Backspace") {
        event.preventDefault();
        setTextErrorMessage(`Not more than ${num} letters!`);
      } else {
        setTextErrorMessage("");
        setTextInput(myValue);
      }
    } else {
      if (myValue.length >= 20 && event.key !== "Backspace") {
        event.preventDefault();
        setNameErrorMessage(`Not more than ${num} letters!`);
      } else {
        setNameErrorMessage("");

        setNameInput(myValue);
      }
    }
  };

  const formHandler = (e) => {
    e.preventDefault();

    if (nameInput.length !== 0 && textInput.length !== 0) {
      const user = {
        id: uuidv4(),
        from: nameInput,
        text: textInput,
      };
      const postOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      };
      fetch(
        "https://cyf-ali-jahankah-chat-server.glitch.me/messages",
        postOptions
      )
        .then((res) => {
          if (res && res.status >= 200 && res.status < 400) {
            resetHandler();
            return res.json();
          }
        })
        .then((data) => setData(data));
    } else {
      setNameErrorMessage("Please fill the input!");
      setTextErrorMessage("Please fill the input!");
    }
  };

  const removeHandler = (id) => {
    const target = messages.find((item) => item.id === id);
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
    fetch(
      `https://cyf-ali-jahankah-chat-server.glitch.me/messages/${target.id}`,
      deleteOptions
    )
      .then((res) => {
        if (res && res.status >= 200 && res.status < 300) {
          return res.json();
        }
      })
      .then((data) => setData(data));
  };
  const nameHandler = () => {
    if (data.length !== 0) {
      const target = data.filter((item) => item.from.includes(nameSearch));

      setMessages(target);
      target.length !== 0
        ? setSearchErrorMessage("")
        : setSearchErrorMessage("User Not Found! :(");
    }
  };
  const resetHandler = () => {
    setTextInput("");
    setNameInput("");
    setnameSearch("");
  };

  return (
    <UserContext.Provider
      value={{
        showMessages,
        setShowMessages,
        data,
        setData,
        messages,
        setMessages,
        nameInput,
        setNameInput,
        textInput,
        setTextInput,
        nameErrorMessage,
        setNameErrorMessage,
        formHandler,
        textErrorMessage,
        setTextErrorMessage,
        inputHandler,
        removeHandler,
        nameSearch,
        setnameSearch,
        nameHandler,
        searchErrorMessage,
        setSearchErrorMessage,
        resetHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
