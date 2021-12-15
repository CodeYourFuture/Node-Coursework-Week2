const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
var server = app.listen(3000, () => {
 console.log('server is running on port', server.address().port);
});
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

// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });


//[ ] Create a new message

app.post("/messages", function (req, res) {

  console.log("POST /albums route");
  console.log(req.body);
  messages.push(req.body);
  res.send(201); // because it has sent message
});
//    }
//- [ ] Read all messages
//to read messages
app.get("/messages", function (req, res) {
  res.send(messages);
});
//- [ ] Read one message specified by an ID

app.get('/messages/:user', (req, res) => {
  var user = req.params.user;
  const message = messages.find(message => message.id == user);
      res.send(message);
  })
 
// app.post('/messages', (req, res) => {
//   var message = new Message(req.body);
//   message.save((err) =>{
//     if(err)
//       sendStatus(500);
//     res.sendStatus(200);
//   })
// })
//- [ ] Delete a message, by ID
app.delete("/messages/:messageID", function (req, res) {
  console.log("DELETE /albums route");
  console.log(req.params.messageID);
  const message = messages.find(message => message.id == req.params.messageID);
  messages.splice(message,1);
  console.log(message);
  console.log(messages);
  res.send(200); // because it has sent message
});

// function addMessages(message){
//    $(“#messages”).append(`
//       <h4> ${messages.from} </h4>
//       <p>  ${messages.text} </p>`)
//    }
   
// function getMessages(){
//   $.get(‘http://localhost:3000/messages', (data) => {
//    data.forEach(addMessages);
//    })
//  }
 
// function sendMessage(message){
//    $.post(‘http://localhost:3000/messages', message)
//  }
// app.listen(process.env.PORT);
