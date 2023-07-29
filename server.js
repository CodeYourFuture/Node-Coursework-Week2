const express = require("express");
const cors = require("cors");
let PORT = 3000;
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
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// read first message

app.get("/messages", function (request, response) {
  response.json({
    data: messages,
    message: "ok",
  });
});

// post/ create new message..

app.post("/messages", function (req, res) {
  let newMessages = req.body;
  if(newMessages.from === "" || newMessages.text === "" ){
   return res.status(400).send("please type in your message!!!")
  } else {
  }messages.push({
    id: messages.length,
    from: newMessages.from,
    text: newMessages.text,
    // ...newMessages, // this works as same as above {from: newMessages.from,text: newMessages.text
  });

  console.log(newMessages)
  res.json({
    data: messages,
    message: "new message added",
  });
});

// find / update message by id

app.put("/messages/:id", function (request, response) {
  const id = Number (request.params.id);
  const updatedMessage = request.body
  const message = messages.find((message) => message.id === id);
  if(!message) {
    return response.status(404).json({
      data: null,
      message: "there is no message for this id."
    })
  } 
 messages = messages.map((message) => {
   if (message.id === id) {
     return {
      id: id,
      from: updatedMessage.from,
      text: updatedMessage.text
      };
   }
   return message;
 });
  response.status(200).json({
    data: messages,
    message: "message was updated"
  })
});


// delete message by id

app.delete("/messages/:id", function (req, res){
  const id = Number(req.params.id);
  const message = messages.find(message => message.id === id)
  if (!message){
    return res.status(404).json({
      data: null,
      messsage: "theres is no message for given id."
    })
  }
  const index = messages.indexOf(message) 
  messages.splice(index, 1);
  res.status(200).json({
   data: messages,
   message: "item removed"

  })
  
})


// port listening 
app.listen(3000, () => {
  console.log("i'm listening on port 3000");
});
