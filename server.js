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



app.get("/messages", function (request, response) {
  response.json(messages);
});






// function CreatNewMessage(messages) {
//   return messages;
// }




// app.post("/", function (req, res) {
//   res.send({messages}).json;
// });

//////////////////////////////////////////////////

app.listen(process.env.PORT,()=>{console.log('server is listening');});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});  

