const express = require("express");
const cors = require("cors"); 

const app = express();

app.use(cors()); 
app.use(express.json());//allows me to use raw
app.use(
  express.urlencoded({
    extended: true,
  })
);
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage, { id: 1, from: "Megumi", text: "Hello" }];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.send(messages);//automatically send sendStatus200
});

app.get("/messages/:id", function (request, response) {
  const message = messages.find((message) => String(message.id) === request.params.id);
  if(message===undefined){
    response
      .status(404)
      .send(`MessageID ${request.params.id} could not be found.`);
  }else{
  response.send(message); //automatically send sendStatus200
  }
});

app.post("/messages", function (request, response) {
  let message = request.body;  
  Object.assign(message, { id: messages.length });            
  messages.push(message);  
  response.sendStatus(200);
// === res.status(200).send('OK')                       
  // response.send(messages);//I don't need to send all messages//post man = client
});

//app.listen(process.env.PORT);                     
app.listen(5500, "localhost", function () {
  console.log(
    `Application is running on ${this.address().address}:${
      this.address().port
    }!`
  );
});
