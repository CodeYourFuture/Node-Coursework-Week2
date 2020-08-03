import React from 'react';
import MessagePost from './MessagePost';
import ShowMessages from "./ShowMessages"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Welcome to the chat</p>
      </header>
      <MessagePost />
      <ShowMessages />
    </div>
  );
}

export default App;
