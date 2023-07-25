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

// const welcomeMessage1 = {
//   id: 1,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };



//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});



//all messages
app.get("/messages", (request, response) => {
  response.send(messages)
})

const dateObject = new Date();
const hours = dateObject.getHours();
const minutes = dateObject.getMinutes();
const seconds = dateObject.getSeconds();



//send a message
app.post("/messages", (request, response) => {
  let newMessage = request.body
  if (newMessage.from === "" || newMessage.text === "") {
    console.log(console.log(console.error()))
    throw new Error("400")
  } else {
    // newMessage.timeSent = `${hours}:${minutes}:${seconds}`
    // newMessage.id = messages.length
    messages.push(newMessage)
    response.send(messages)
  }

})



// get message  from search
app.get("/messages/search", (request, response) => {
  let searchWord = request.query.text
  response.send(getMessFromSearch(messages, searchWord))
})

// get 10 latest
app.get("/messages/latest", (request, response) => {
  response.send(getLatestMessages(messages))
})

//get one message by ID
app.get("/messages/:id", (request, response) => {
  let singleMessage = request.params.id
  response.send(getMessageByID(messages, singleMessage))
})



//delete message by ID
app.delete("/messages/:id", (request, response) => {
  let id = request.params.id
  response.send(deleteMessageByID(messages, id))
})

app.listen(process.env.PORT, () => {
  console.log(`listening on PORT ${process.env.PORT}...`);
});

// functions

const getMessageByID = (messages, id) => {
  return messages.map((message) => {
    if (message.id == id) {
      return message
    }
  })
}

const deleteMessageByID = (messages, id) => {
  let objWithIdIndex = messages.findIndex((message) => message.id == id);

  if (objWithIdIndex > -1) {
    messages.splice(objWithIdIndex, 1);
  }
  return messages;
}

const getMessFromSearch = (messages, word) => {
  return messages.filter(message =>
    message.text.toLowerCase().includes(word.toLowerCase())
  )
}

const getLatestMessages = (messages) => {
  return messages.slice(Math.max(messages.length - 10, 0))

}

