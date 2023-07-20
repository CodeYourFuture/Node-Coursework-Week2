process.env.PORT = process.env.PORT || 9090;
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

const welcomeMessage = {
  id: 0,
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

app.get("/messages", (request, response) => {
  response.send({ messages })
})

app.get("/messages/id", (request, response) => {
  let singleMessage = request.query.messageID
  response.send(getMessageByID(messages, singleMessage))
})



app.post("/messages", (request, response) => {
  let newMessage = request.body
  messages.push(newMessage)

})

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

// functions

const getMessageByID = (messages, id) => {
  return messages.filter((message) => {
    return message.id == id
  })
}

