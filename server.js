const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.port || 3000;

const welcomeMessage = {
  id: 0,
  from: "Kate",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/messages', (request, response) => {
  response.json(messages);
})

app.post('/messages', (request, response) => {
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text
  } 
  
  if(!newMessage.from || !newMessage.text) {
    response.status(400).json({msg: "Please complete Name and Message fields."})
  } else {
    messages.push(newMessage);
    response.json(messages);
  }
})

 app.get('/messages/:id', (request, response) => {
   const id = request.params.id;
     response.send(messages.filter((message) => message.id === Number(request.params.id)));
   
 })

app.delete('/messages/:id', (request, response) => {
     const messageId = messages.filter((message) => message.id === Number(request.params.id))   
     
     if (messageId) {
     response.status(200).json({msg: `Message id: ${request.params.id} deleted `,
      "All messages: ": messages.filter((message) => message.id !== Number(request.params.id)),
    });
  }
 });

app.get('/messages/search', (request, response) => {
  let text = request.query.word;
  response.send(messages.filter((message) => message.text.includes(text) || message.from.includes(text)));
})

app.get("/messages/latest", (request, response) => {
  if (messages.length < 10) {
    response.send("There are no ten recent messages");
  } else {
    response.send(messages.slice(-10));
  }
});


app.listen(process.env.PORT);
