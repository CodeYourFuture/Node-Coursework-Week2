const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({extended: false}))

app.get("/", function(request, response){
  response.sendFile(__dirname + "/index.html");
});

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const myMessage = {
  id: 1,
  from: "Jas",
  text: "Hello, how are you?",
};

const joannaMessage = {
  id: 0,
  from: "Joanna",
  text: "Have a lovely day",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage, myMessage, joannaMessage];



app.get('/messages', (req, res)=> {
  res.send(messages);
} );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server on port 3000'));
