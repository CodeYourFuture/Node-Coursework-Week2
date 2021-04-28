import express from 'express';
import cors from 'cors';
import path from 'path';
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();


const app = express();
app.use(express.json());

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

let counter = 1;

app.use(express.urlencoded({extended: false, limit: "20mb"}));

app.get("/messages", (req, res) => {
  res.json(messages);
})

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  if (newMessage.from && newMessage.text && !newMessage.id) {
    newMessage.id = counter;
    counter++;
    messages.push(newMessage);
    res.status(201);
    res.send(messages);
  } else if (newMessage.from && newMessage.text && newMessage.id) {
    messages.push(newMessage);
    res.status(201);
    res.send(newMessage);
  } else {
    res.status(400);
    res.send({message: "The message doesn't have the required fields"});
  }
});

app.get("/messages/:id", (req, res) => {
  const id = req.params.id;
  const messageById = messages.find(message => message.id.toString() === id);
  res.json(messageById);
});

app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  const messageIndex = messages.findIndex(message => message.id.toString() === id);
  messages.splice(messageIndex, 1);
  res.json({message: `A message by the ID ${id} is deleted from the database.`});
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
