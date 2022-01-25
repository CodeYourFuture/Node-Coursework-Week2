const express = require("express");
const cors = require("cors");

const app = express();

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

//create a new message
app.post('/', function (request, response) {
  const newWelcomeMessage = {
    id: uuid.v4(),
    from: require.body.name,
    text: require.body.message,
  };
  messages.push(newWelcomeMessage);
  response.json(messages);
});

//Read all messages

app.get('/', function(request, response){
  response.json(messages.filter(message => message.text))
})

//Read single message specify by an id

app.get('/:id', function(request, response){
  
})


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(process.env.PORT);
