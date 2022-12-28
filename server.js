const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Joanna",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/",  (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//All messages
app.get("/messages", (req, res) => {
  res.send(messages);
})

//New message
app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  const newMessages = {
    id: messages.length + 1,
    from,
    text,
  };

if (!newMessages.from || !newMessages.text) {
  return res.status(400).json("You must include a name and message");
}

messages.push(newMessages);
res.send(messages);
})

//Message specified by ID
app.get("/messages/:id", (req,res) => {
  const foundId = messages.filter((i) => i.id === Number(req.params.id));

  if (foundId) {
    res.status(200).send(foundId);
  }
});

// Delete a message by ID
app.delete("/messages/:id", (req, res) => {
  const foundId = messages.filter((i) => i.id === Number(req.params.id));



  if(foundId) {
    return res.status(200).json({
      msg: `Message id: ${req.params.id} deleted`,
      "All messages": messages.filter((i) => i.id !== Number(req.params.id)),
    });
  }
});

app.listen(PORT);


