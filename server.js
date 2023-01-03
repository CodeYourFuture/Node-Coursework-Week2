const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(express.json());

app.use(cors());
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",

};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

//Create a message.
const messages = [welcomeMessage];

const timeStamp = new Date().toLocaleTimeString();
app.post("/messages", function(request, response){
  const message = {
    id: 0,
    from: request.body.from,
    text: request.body.text,
    timeSent: timeStamp,
  };
  if(!message.from || !message.text){
    return response
    .status(400)
    .json({msg:"Please include message & sender!"});
  }else{
    messages.push(message);
    response.status(201);
    message.id = messages.indexOf(message);
    response.json(messages);

  }
});



//Display all messages
app.get("/messages", function(request, response){
  response.json(messages);
});

// Search message by ID 

app.get("/messages/:id", function(request, response){
  let inputId = request.params.id;

  if(inputId > messages.length || inputId < 0){
    response.status(400).send({msg:'No message with id: ${inputId} found'});
  }else{
    const message = messages.filter((msg) => msg.id == inputId);
    response.json(message);
  }
});

// Delete a message by specific Id.
app.delete("/messages/:id", function(request, response){
  let inputId = request.params.id;

  if(inputId > messages.length || inputId < 0){
    response.status(400).send({msg:'No message with id: ${inputId} found'});
  }else{
    const msgToBeDeleted = messages.findIndex((msg) => msg.id == inputId);
    messages.splice(msgToBeDeleted, 1);
    response.status(200).send(messages);
    response.end();
  }
  });
  //Search with word a word/string
  function Searching(word){
    let filteredMessages = messages.filter((inputText) => {
return(
  inputText.text.toLocaleLowerCase().includes(word.toLocaleLowerCase()) || 
  inputText.form.toLocaleLowerCase().includes(word.toLocaleLowerCase())
);
    });
    if (word.length > 0){
      return filteredMessages;
    }else{
      return "No such messages found!";
    }
  }
app.get("/message/search", function(request, respionse){
  response.send(Searching(request.query.text));
});
  //Show 10 latest messages

  app.get("/messages/latest", function(request, response){
    response.send(messages.slice(-10));
  });

  //Updating Messages

  app.put("/messages/: id", function(request, response){
    let oldMessage = {};
    let newMessage = {};
    messages.forEach((msg, index) =>{
      if(msg.id == request.params.id){
        newMessage = {...msg,...request.body};
        oldMessage = messages[index];
        messages[index] = newMessage;
      }
    });
    response.json({
      success: true,
      oldMessage: oldMessage,
      newMessage: newMessage,
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));