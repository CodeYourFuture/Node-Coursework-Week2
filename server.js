const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//handling CORS
// app.use((request ,response, next)=>{
//   response.header('Access-Control-Allow-Origin','*');
//   response.header('Access-Control-Allow-Headers', '*');
//   if(request.method === 'OPTIONS'){
//     response.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//     return response.status(200).json({});
//   }
//   next();
// })

//handling 404 error
// app.use((request, response, next) =>{
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// })

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

//Post message
app.post("/messages", function(request, response) {
  if (request.body.from === "" || request.body.text === "") {
    response.status(400).json({
      message: "Information Missing"
    });
  } else {
    let newId = messages[messages.length - 1].id + 1;
    const newMessage = {
      id: newId,
      from: request.body.from,
      text: request.body.text
    };
    messages.push(newMessage);

    response.status(201).json({
      message: "message sent"
      //messageContent: newMessage
    });
  }
});

//Get all messages
app.get("/messages", function(request, response) {
  response.json(messages);
});

//get message by Id
app.get("/messages/:messageId", (request, response) => {
  const { messageId } = request.params;
  const message = messages.find(m => m.id === parseInt(messageId));
  response.json(message);
});

//delete message by Id
app.delete("/messages/:messageId", (request, response) => {
  const { messageId } = request.params;
  let index = messages.findIndex(message => message.id === messageId);
  const messages = messages.filter(
    message => message.id === parseInt(messageId)
  );
  if (messages.length !== 0) {
    messages.splice(index, 1);
    response.status(200).send();
  } else {
    response.status(400).send();
  }
});

app.listen(process.env.PORT);
