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
  const [showEdit, setShowEdit] = useState(false);
  const [editInput, setEditInput] = useState("");
  const [editText, setEditText] = useState("");
  const [messageID, setMessageID] = useState("");
  const [loader, setLoader] = useState(false);

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

  const inputHandler = (event, num, editType) => {
    let myValue = event.target.value.replace("  ", " ");
    if (num === 100) {
      if (myValue.length >= 100 && event.key !== "Backspace") {
        event.preventDefault();
        setTextErrorMessage(`Not more than ${num} letters!`);
      } else {
        setTextErrorMessage("");
        editType === "edit" ? setEditText(myValue) : setTextInput(myValue);
      }
    } else {
      if (myValue.length >= 20 && event.key !== "Backspace") {
        event.preventDefault();
        setNameErrorMessage(`Not more than ${num} letters!`);
      } else {
        setNameErrorMessage("");

        editType === "edit" ? setEditInput(myValue) : setNameInput(myValue);
      }
    }
  };

  const formHandler = (e, editType) => {
    e.preventDefault();
    if (editType !== "edit") {
      if (nameInput.length !== 0 && textInput.length !== 0) {
        setLoader(true);
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
          .then((data) => {
            setLoader(false);
            return setData(data);
          });
      } else {
        setNameErrorMessage("Please fill the input!");
        setTextErrorMessage("Please fill the input!");
      }
    } else {
      if (editInput.length !== 0 && editText.length !== 0) {
        const user = {
          from: editInput,
          text: editText,
          id: messageID,
        };
        const putOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        };
        fetch(
          `https://cyf-ali-jahankah-chat-server.glitch.me/messages/${messageID}`,
          putOptions
        )
          .then((res) => {
            if (res && (res.status >= 200) & (res.status < 206)) {
              setLoader(true);
              resetHandler();
              return res.json();
            }
          })
          .then((all) => {
            setShowEdit((prev) => !prev);
            setLoader(false);
            return setData(all);
          });
      } else {
        setNameErrorMessage("Please fill the input!");
        setTextErrorMessage("Please fill the input!");
      }
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
          setLoader(true);
          return res.json();
        }
      })
      .then((data) => {
        setLoader(false);
        setData(data);
      });
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
  const setUserHandler = (item) => {
    setEditInput(item.from);
    setEditText(item.text);
    setMessageID(item.id);
    setShowEdit((prev) => !prev);
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
        showEdit,
        setShowEdit,
        editInput,
        setEditInput,
        editText,
        setEditText,
        messageID,
        setMessageID,
        setUserHandler,
        loader,
        setLoader,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Context;
