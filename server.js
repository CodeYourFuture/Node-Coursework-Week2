const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json())

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
app,get("/messages",function(request,response){
  response.send({messages})
})
app,get("/messages/:id",function(request,response){

  const messageId=request.params.id;
  response.send({messageId})
})

app.listen(9090);
