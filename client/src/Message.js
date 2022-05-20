import React from 'react'

const Message = ({loadMessage}) => {
  return (
    <div>
       <form action="http://localhost:3001/messages" method="post">
        <div className="mb-3">
          <label htmlFor="from" className="form-label">
           ID: {loadMessage.id} 
          </label>
        </div>
        <div className="mb-3">
          <label htmlFor="from" className="form-label">
           Name
          </label>
          <input
            type="text"
            name='from'
            className="form-control"
            id="from"
            value={loadMessage.from}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Message
          </label>
          <textarea
            type="text"
            name='text'
            className="form-control"
            id="text"
            value={loadMessage.text}
          />
        </div>
        <button type="submit" className="btn-sm btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Message
