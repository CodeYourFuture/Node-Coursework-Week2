const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF Chat System!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// app.get("/", function (request, response) {
//   response.json(welcomeMessage).sendFile(__dirname + "/index.html");
// });

app.get("/messages", function (request, response) {
  response.json(messages);
})

app.post("/messages", function (request, response) {
  console.log(request.body);
  if(!request.body.from || !request.body.text){
    response.status(400).json({msg: "Please provide some texts to post"});
    return;
  }
  messages.push(request.body);
  response.json(request.body);
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
