const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.listen(PORT);
console.log(PORT);

const welcomeMessage = {
  id: 1,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//Create a new message

// app.post("/messages",  (req, res) =>  {
//   response.json(messages);
// });

// Read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  //root
  let { id } = request.params;
  id = parseInt(id);
  const findInboxMessage = messages.find((message) => message.id === id);
  response.json(findInboxMessage);
});

//Delete a message, by ID
// app.delete("/messages/:id", (request, response)=> {
//   const
// const deleteMessageId = messages.forEach((messages) =>{
//   if(messages)
// })

// app.listen(process.env.PORT);
