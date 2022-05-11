import React, { createContext } from "react";

const UserContext = createContext({
  messages: [],
  setMessages: () => {},
  showMessages: false,
  setShowMessages: () => {},
  data: [],
  setData: () => {},
  nameInput: "",
  setNameInput: () => {},
  textInput: "",
  setTextInput: () => {},
  formHandler: () => {},
  nameErrorMessage: "",
  setNameErrorMessage: () => {},
  textErrorMessage: "",
  setTextErrorMessage: "",
  inputHandler: () => {},
  removeHandler: () => {},
  nameSearch: "",
  setnameSearch: () => {},
  nameHandler: () => {},
  searchErrorMessage: "",
  setSearchErrorMessage: () => {},
  setSearchHandler: () => {},
  resetHandler: () => {},
});
export default UserContext;
