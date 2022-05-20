import React, { useState } from 'react';
import Message from './Message';
import Messages from './Messages';
import './App.css';

function App() {
  const [showMessages, setShowMessages] = useState(false)
  const [editedMessage, setEditedMessage] = useState({})
  const loadHandler = loadedMessage => {
    setEditedMessage(loadedMessage)    
    console.log(loadedMessage)
    console.log(editedMessage)
  }
 
  return (
    <div className="App">
      <h1>CYF Chat Server</h1>
      {editedMessage&&<Message loadMessage={editedMessage}/>}
      <button className='btn btn-secondary' onClick={()=> setShowMessages(!showMessages)}>Show Messages</button>
      {showMessages&&<Messages loadHandler={loadHandler} />}
    </div>
  );
}

export default App;
