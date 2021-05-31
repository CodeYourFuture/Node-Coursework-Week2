//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

let messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 1,
    from: "Neil",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 2,
    from: "Lucy",
    text: "Welcome to CYF chat system!",
  },
  {
    id: 3,
    from: "Thomas",
    text: "Welcome to CYF chat system!",
  },
]

module.exports = messages;