const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];
app.get("/messages",(req,res)=>{
  
  res.json(messages);
})
app.post("/messages",(req,res)=>{
  messages.push(req.body)
  console.log(req.body)
  res.end()
})


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(port, () => { console.log("Running server..."); });
