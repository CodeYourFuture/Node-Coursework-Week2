const express = require("express");
const cors = require("cors");
const app = express();

// Middleware to handle JSON files
app.use(express.json()); 
// To handle the data transfers between browser and the server
app.use(cors()); 

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

let messages = [welcomeMessage];

// Read the home page
app.get("/", function (req, res) {
  console.log('Get Request was made...');
  console.log(__dirname);
  res.sendFile(`${__dirname}/index.html`);
});


// Read all messages
app.get("/messages",(req, res) => {
  console.log('Reading all the messages at /messages route')
 res.json(messages);
})

// Create a new message
app.post("/messages", (req, res) => {
  console.log("POST /messages route");
  console.log(req.body);
  messages.push(req.body);
  res.status(200).json(`The messages has been Successfully Added`);
});

// Read one message specified by an ID
app.get("/messages/:id", (req, res) => {
 const id = Number(req.params.id);
const requiredMessage = messages.find(message => message.id === id);
res.json(requiredMessage);
})

// Delete message specified by an ID 
app.delete('/messages/:id', (req, res) => {
  console.log('DELETE /messages:id Route');
  const deleteById = parseInt(req.params.id);
  const deleteMgsById = messages.filter(message => message.id !== deleteById);
  messages = deleteMgsById;
res.status(200).json(`The messages has been Successfully Deleted`);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is Listening at port ${PORT}`);
})