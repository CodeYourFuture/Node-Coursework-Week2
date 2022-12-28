import { useState } from "react";
import "./App.css";
import AddMessage from "./components/AddMessage";
// import Button from "./components/Button";
import AllMessages from "./components/AllMessages";
import Search from "./components/Search";

function App() {
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [isNewMessage, setIsNewMessage] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState({});

  return (
    <div className="App">
      <h1>CYF Chat Server</h1>
      <div className="btn-container">
        <Search setMessages={setMessages} />
        {/* <Button /> */}
      </div>
      <AllMessages
        messages={messages}
        setMessages={setMessages}
        setName={setName}
        setText={setText}
        setIsNewMessage={setIsNewMessage}
        setSelectedMessage={setSelectedMessage}
      />

      <AddMessage
        name={name}
        setName={setName}
        text={text}
        setText={setText}
        isNewMessage={isNewMessage}
        setIsNewMessage={setIsNewMessage}
        selectedMessage={selectedMessage}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
}

export default App;
