const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//  Create a new message
app.post("/messages",(req,res)=>{
  
  const message=req.body;     
  messages.push(message);
  res.json({"success":true});     


}    
);

//  Read All messages
app.get("/messages",(req,res)=>{

res.json(messages);

});



const port =process.env.PORT||5000;
app.listen(port);
