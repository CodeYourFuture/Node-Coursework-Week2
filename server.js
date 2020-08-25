const express = require("express");
const cors = require("cors");
//const { check, validationResult } = require("express-validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [  welcomeMessage,
  {
    id: 1,
    from: "Joanna",
    text: "Hey, how are you?"
  },
  {
    id: 2,
    from: "Tas",
    text: "Are you going us today"
  },
  
  {
    id: 3,
    from: "Altom",
    text: "Are you going us today"
  }
  
];

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

// const randomId = (){
//   return Math.floor(Math.random() * 1000000000);
// }

//read  all messages

app.get("/messages", (req, res) => {
  res.json(messages);
});

// create message
app.post("/messages", (req, res) => {
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let time =
    today.getHours() + 1 + ":" + today.getMinutes() + ":" + today.getSeconds();
  let dateTime = date + " " + time;
  let newId = messages.length + 1;
  if (!req.body.from || !req.body.text) {
    res.status(422).json("Field cannot be empty ");
  } else {
    let newPost = {
      timeSent: dateTime,
      id: newId,
      from: req.body.from,
      text: req.body.text
    };
    messages.push(newPost);
    res.json(messages);
  }
});

//read one message specified by an ID

// app.get("/messages/:id", (req, res) => {
//   let id = req.params.id;
//   let found = messages.find(message => message.id == id);
//   console.log(found);
//   res.json(found);
// });

//Delete a message, by ID

app.delete("/messages/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  let index = messages.findIndex(message => message.id === id);

  if (index) {
    messages.splice(index, 1);
    res.json(`message with id: ${id} has been deleted`);
  } else {
    res.status(404).json("Please enter valid id to delete");
  }
});

// // update msg

app.put("/messages/:id", (req, res) => {
  let id = Number(req.params.id);
  console.log(id);
  let newText = req.body.text;
  let found = messages.find(message => message.id == id);
  console.log(found);
  let updatedMsg = [];
  messages.forEach(message => {
    if (message.id === found.id) {
      message.text = newText;
      updatedMsg.push(message);
    } else {
      updatedMsg.push(message);
    }
  });
  res.json({ message: "Your message has been updated successfully" });
});

//Read only the most recent 10 messages: /messages/latest

app.get("/messages/latest", (req, res) => {
  let latestMessages = messages.slice(-2);
  res.json({
    message: `You are seeing ${latestMessages.length} messages`,
    latestMessages
  });
});

//Read only messages whose text contains a given substring: /messages/search?text=express

app.get("/messages/search", (req, res) => {
  let searchText = req.query.text;
  console.log(searchText);
  if (searchText !== undefined) {
    console.log(messages);
    let searchResult = messages.filter(message =>
      message.text.toLowerCase().includes(searchText.toLowerCase())
    );

    if (searchResult.length < 1) {
      res.status(400).json(`This "${searchText}" search  word is invalid `);
    } else {
      res.json(searchResult);
    }
  }
});

// //create a new message
// app.post(
//   "/messages",
//   [
//     check("from")
//       .not()
//       .isEmpty()
//       .withMessage("Name cannot be empty."),
//     check("text")
//       .not()
//       .isEmpty()
//       .withMessage("message cannot be empty.")
//   ],
//   (req, res) => {
//     let newPost = {
//       id: messages.length + 1,
//       from: req.body.from,
//       text: req.body.text
//     };

//     const errors = validationResult(req);
//     console.log(req.body);

//     if (!errors.isEmpty()) {
//       return res.status(422).json(errors.array());
//     } else {
//       messages.push(newPost);
//       res.json(messages);
//     }
//   }
// );





const listener = app.listen(process.env.PORT || 3005, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
