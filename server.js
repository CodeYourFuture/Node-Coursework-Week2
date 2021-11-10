const express = require("express");
const cors = require("cors");
const { request, response } = require("express");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  response.send(messages);
});
app.get("/messages/search", (request, response) => {
  const text = request.query.text.toLowerCase();
  const messagesWithSelectedText = messages.filter((message) =>
    message.text.toLowerCase().includes(text)
  );
  response.send(messagesWithSelectedText);
});

app.get("/messages/latest", (request, response) => {
  response.send(messages.slice(-10));
})
app.get("/messages/:id", (request, response) => {
  const id = +request.params.id;
  const selectedId = messages.filter(message => message.id === id);
  if(selectedId.length === 0){
    return response.status(400).send({MSG: `This id doesn't exist`});
  }
  response.send(selectedId);
});

app.post("/messages", (request, response) => {
  const { text, from } = request.body; 
  if(!text || !from){
   return response.status(400).send({MSG: `There is no text or from`});
  }
  const newObject = {
    id: messages[messages.length - 1].id + 1,
    text: text,
    from: from,
    timeSent: new Date().toLocaleString("en-GB"),
  }; 
  messages.push(newObject);
  response.send(newObject);
});

app.delete("/messages/:id", (request, response) => {
  const id = +request.params.id;
  const index = messages.findIndex(message => message.id === id);
  if(index === -1){
    return response.status(400).send({MSG:`Check id`});
  }
  messages.splice(index, 1);
  response.send(`Message ${id} deleted`);
});

// update the message
app.put("/messages/:id", (request, response) => {
  const id = +request.params.id;
  const { text, from } = request.body;
  const selectedMessage = messages.filter(message => message.id === id);
  if(selectedMessage.length === 0){
    return response.status(400).send({ MSG: `Check id` });
  }
  selectedMessage[0].text = text || selectedMessage[0].text  //index reaches to the object
  selectedMessage[0].from = from || selectedMessages[0].from

  response.send(selectedMessage);
});


app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
