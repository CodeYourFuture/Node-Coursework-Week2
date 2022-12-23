import React from 'react'

const MessageList = () => {
  return (
    <div className="dly-msg">
      <h1>CYF Chat Server</h1>
      <div className='msg-btn'>
        <button>Edit</button>
        <div>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default MessageList
