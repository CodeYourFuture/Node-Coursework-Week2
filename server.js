const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//create a new message
app.post("/messages", (req, res)=>{
  
  let newPost ={
    id:messages.length +1 ,
    from: req.body.from,
    text: req.body.text
  }
  
  messages.push(newPost)
  res.json(messages)
})


//read  messages

app.get("/messages", (req, res) => {
 res.json(messages);
});

///Read one message specified by an ID
// app.get("/messages/:id", (req, res)=>{
//   let id = Number(req.params.id);
//   let result = messages.find(message => message.id === id);
//   if(result){
//     res.json(result)
//   }else{
//     res.status(400).json("what's hell you mean!");
//   }
// })

// Delete a message, by ID

app.delete("/messages/delete/:id", (req, res)=>{
 let id = Number(req.params.id);
 let index = messages.findIndex(message =>message.id === id);
 if(index){
  messages.splice(index, 1);
  res.json(`message with id: ${id} has been deleted`);
 }else{
  res.status(404).json("Please enter valid id to delete");
 }
})

const listener = app.listen(process.env.PORT || 3005, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
