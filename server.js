const express = require("express");
const cors = require("cors");


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

app.get("/messages/:id", (request, response) => {
  const id = +request.params.id;
  const selectedId = messages.filter(message => message.id === id);
  response.send(selectedId);
})
app.post("/messages", (request, response) => {
  const { text, from } = request.body;
  if(!text || !from){
   return response.status(400).send({MSG: `There is no "text" or "from"`});
  }
  const newObject= {
    id: messages[messages.length-1].id + 1,
    text: text,
    from: from,
}; 
  messages.push(newObject);
  response.send(newObject);
});
app.delete("/messages/:id", (request, response) => {
  const id = +request.params.id;
  const index = messages.findIndex(message => message.id === id);
  messages.splice(index, 1);
  response.send(`Message ${id} deleted`);
});

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
