const express = require("express");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

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
const messages = [welcomeMessage];

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

// const randomId = (){
//   return Math.floor(Math.random() * 1000000000);
// }
//create a new message
// app.post("/messages", (req, res) => {

//   if (req.body.from !== "" && req.body.tex !== "") {
//    id:messages.length
//     messages.push(req.body);
//     res.json({ success: 200});
//   } else {
//     res.status(400).send("message incomplete, please fill in all fields");
//   }
// });

//create a new message
app.post(
  "/messages",
  [
    check("from")
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty."),
    check("text")
      .not()
      .isEmpty()
      .withMessage("message cannot be empty.")
  ],
  (req, res) => {
    let newPost = {
      id: messages.length + 1,
      from: req.body.from,
      text: req.body.text
    };

    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).json(errors.array());
    } else {
      messages.push(newPost);
      res.json(messages);
    }
  }
);

//read  messages

app.get("/messages", (req, res) => {
  res.json(messages);
});

//read one message specified by an ID
app.get("/messages/:id", (req, res)=>{
  let id = Number(req.params.id);
  let result = messages.find(message => message.id === id);
  if(result){
    res.json(result)
  }else{
    res.status(400).json(`Id ${id} is not valid`);
  }
})

// Delete a message, by ID

// app.delete("/messages/delete/:id", (req, res) => {
//   let id = Number(req.params.id);
//   let index = messages.findIndex(message => message.id === id);
//   if (index) {
//     messages.splice(index, 1);
//     res.json(`message with id: ${id} has been deleted`);
//   } else {
//     res.status(404).json("Please enter valid id to delete");
//   }
// });

const listener = app.listen(process.env.PORT || 3005, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
