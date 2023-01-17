import React from "react";
import './index.css'
import MessagesList from "./components/MessagesList";
import MessageForms from "./components/Form";

function App() {
  return (
    <div>
      <MessageForms />
      <MessagesList />
    </div>
  );
}

export default App;
