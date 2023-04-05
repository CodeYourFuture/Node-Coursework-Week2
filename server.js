const express = require("express");
const cors = require("cors");
const {request,response, urlencoded} = require ('express');
const app = express();
const PORT= process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended:false}));
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


// Create a new message
app.post('/messages', function(req,res) =>{
const newMessage = {
  id:messages.length,
  from:req.body.from,
  text: req.body.text,
  timeSent:newD
}  
})


// - [ ] Read all messages



// - [ ] Read one message specified by an ID



// - [ ] Delete a message, by ID

app.listen(PORT, function () {
  console.log(`Listening on ${PORT}`);
});
