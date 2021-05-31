//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

module.exports = welcomeMessage;

// {
//   id: 2,
//   from: "Ais",
//   text: "Welcome to London!",
// }