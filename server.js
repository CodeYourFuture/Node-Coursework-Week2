const express = require("express");
const cors = require("cors");

const app = express();
const uuid = require("uuid");
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 8002;
app.use(cors());
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const welcomeMessage = [
  {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
},
{
  id: 1,
  from: "Bart",
  text: "Please type your name and press enter",
},
];
//This array is our "data store".
//We will start with one message in the array.

//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
//Body parser middleware 
app.use(bodyParser.json());

// API must allow client to create a new message and return the new message/all messages
app.post("/messages", (req, res) => {
  // console.log(req.body)
  const newMessage = {
    id: uuid.v4(),
    from : req.body.from,
    text: req.body.text,
  };

  if(!newMessage.from || !newMessage.text){
    return res.status(400).json({msg : 'Please include a text and from'})
} else {
  welcomeMessage.push(newMessage);
  res.json(welcomeMessage);
  
}
});



// API must allow client to get a single message by id
app.get("/messages/:id", (req, res) => {
  console.log(req.params.id)
  const messageId = req.params.id;
  const message = welcomeMessage.find((message) => message.id === parseInt(messageId));
  if (message) {
    res.json(message);
  } else {
    res.status(404).json({ msg: `Message not found of ${req.params.id}` });
  }
});

// API must allow clinet to update a message by id 
// app.put("/messages/:id", (req, res) => {
//   const updatedMessage = messages.filter((message) => message.id === parseInt(req.params.id));
//   const newMessage = updatedMessage.map((message) => {
//     message.from = req.body.from;
//     message.text = req.body.text;
//   });
//   res.json(newMessage);
// });



// API must allow client to delete a message

app.delete("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const message = welcomeMessage.filter((message) => message.id !== parseInt(messageId));
  if (message) {
    res.json({
      msg: `Message ${messageId} deleted`,
      Message: welcomeMessage.filter((message) => message.id !== parseInt(messageId))
    })
  } else {
    res.status(404).json({ msg: `Message not found of ${req.params.id}` });
  }
});
// API must allow client to update a message by id
app.put("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const message = welcomeMessage.find((message) => message.id === parseInt(messageId));
  if (message) {
    res.json({
      msg: `Message ${messageId} updated`,
      Message: welcomeMessage.filter((message) => message.id !== parseInt(messageId))
    }
    );
  } else {
    res.status(404).json({ msg: `Message not found of ${req.params.id}` });
  }
});


//API must allow client to get all messages
app.get("/messages", (req, res) => {
  res.json(welcomeMessage);
});

//API must allow client to get the latest 10 messages
app.get("/messages/latest", (req, res) => {
  res.json(welcomeMessage.slice(welcomeMessage.length - 10));
});


app.post("/messages", function (request, response) {
  let id = messages.length;
  console.log(request.body);
   console.log(request.body.text);

  if (
    request.body === null ||
    request.body.text == " " ||
    request.body.text == "" ||
    request.body.text === null ||
    request.body.from === " " ||
    request.body.from == "" ||
    request.body.from === null
  ) {
    response.status(400).send("not valid request");
  } else {
    const newMassage = {
      id: id,
      from: request.body.from,
      text: request.body.text,
    };

    messages.push(newMassage);
    response.json(messages);
  }
});



app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
