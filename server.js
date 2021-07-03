const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// Read all messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Get message by ID
app.get('/messages/:id', (req, res) => {
  const { id } = req.params;
  const matchedId = messages.some(message => message.id === parseInt(id)  );

  if (matchedId) {
    const foundId = messages.find(message => message.id === parseInt(id));
    res.json(foundId)
  } else {
    res.status(404).json({
      msg: `No message with the id of ${id}` 
    })
  }
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(PORT);
