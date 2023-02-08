const express = require("express");
const cors = require("cors");
// const path =require("path")
const app = express();
// app.use(express.static(path.resolve(__dirname,"./client/build")))
app.use(cors());
const port = 3002;
app.use(express.json())
const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// app.get("/", function (request, response) {
//   response.sendFile(__dirname + "/index.html");
// });

app.get("/", function (request, response) {
  response.json(welcomeMessage);
});

app.get("/messages", function (req, res){
  response.json(messages);
});

app.post("/messages", function(req, res){
  if(!req.body.from || !req.body.text){
    response.status(400).json({message: "Please enter the text to post"});
    return;
  }
  messages.push(request.body);
  response.json(request.body);
})


app.listen(port, ()=> console.log(`Listening on port ${port}`));
