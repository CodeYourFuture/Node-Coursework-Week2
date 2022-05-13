const express = require("express");
const cors = require("cors");
const PORT = 5000;

const app = express();

app.use(cors());

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

//Level 1 Challenge - make the chat server
let messages = [
  {id:0, from: "Bart", text: "Welcome to CYF chat system!"},
  {id:1, from: "Maira", text: "Welcome to Cake chat system!"},
  {id:2, from: "Mete", text: "Welcome to Nursery chat system!"},
  {id:3, from: "Cagri", text: "Welcome to Finance chat system!"}

];


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//all messages 
app.get("/messages", function(req,res) {
  res.send(messages);
})

//find messages by id
app.get("/messages/:id", (req,res,) => {
    // const id = parseInt(req.params.id);//parseInt coverts string to number
    let findMessageById = messages.find((message) => message.id === Number(req.params.id));
    // console.log(findMessageById);
    if(!findMessageById){
      return res.sendStatus(404);
    }
    res.json(findMessageById);
  })

  //https://www.tabnine.com/code/javascript/functions/express/Express/delete

//delete message by ID
app.delete("/delete/:id", (req,res) => {
  let id = req.params.id;
  let findMessageById = messages.find((message) => message.id === id)
  if (!findMessageById) {
    res.sendStatus(404);
  }else {
    messages = messages.filter((message) => message.id !== id)
    res.sendStatus(200);
  } //replacing original array
    
  //filter
}

  //  let findMessageById = messages.find((message) => message.id === Number(req.params.id));
  //  let deleteMessageById = ;
  //  if(findMessageById){
  //    return res.sendStatus(200)
  //  }
  //  if(!findMessageById) {
  //    return res.status(400).json("Message not found")
  //  }else 
 




app.listen(PORT, function(){
  console.log(` app listening on port ${PORT}!`);
});
