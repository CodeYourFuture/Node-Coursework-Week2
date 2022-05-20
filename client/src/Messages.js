import React, { useState, useEffect } from 'react'
// const moment = require('moment')

const Messages = ({ loadHandler }) => {
  const [allMessages, setAllMessages] = useState([])
  const now = new Date()
  useEffect(() => {
    fetch('http://localhost:3001/messages')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
        } else {
          setAllMessages(data)
        }
      })
  }, [allMessages])

  async function removeHandler(id) {
    await fetch(`http://localhost:3001/messages/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) console.log(data.error)
      })
  }

  return (
    <div className="messages">
      {allMessages.map((message) => {
        let toTime = new Date(message.timeSent)
        let mesTime = Math.round(Math.floor(now-toTime.getSeconds())/1000)%3600
        return (
          <div key={message.id}>
            <div className="messages">
              <span>Message ID : {message.id}</span>
              <span>Name : {message.from}</span>
              <span>{message.text}</span>
            </div>
            <button
              className="btn-sm btn-primary m-1"
              onClick={() => loadHandler(message)}
            >
              Edit
            </button>
            <button
              className="btn-sm btn-danger"
              onClick={() => {
                removeHandler(message.id)
              }}
            >
              Delete
            </button>
            <span>
              {mesTime}
              {/* {moment.duration(Date.now().diff(message.timeSent)).asSeconds()} */}
            </span>
          </div>
        )
      })}
      <button className="btn-sm btn-success" onClick={() => setAllMessages([])}>
        Refresh
      </button>
    </div>
  )
}

export default Messages
