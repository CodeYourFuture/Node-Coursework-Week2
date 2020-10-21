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
      <main className="chat-box">
      <MessagePost />
      <ShowMessages />
      </main>
      <footer>
        <p>project for CYF ldn class 6</p>
      </footer>
    </div>
  );
}

export default App;
