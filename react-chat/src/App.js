import React from 'react';
import MessagePost from './MessagePost';
import ShowMessages from "./ShowMessages"
import "./App.css"
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="greeting">Welcome to the chat</p>
      </header>
      <MessagePost />
      <ShowMessages />
    </div>
  );
}

export default App;
