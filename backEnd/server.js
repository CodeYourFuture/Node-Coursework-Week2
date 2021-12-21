const express = require("express");
//const cors = require("cors");

const app = express();

//app.use(cors());
app.use(express.json()); //All message content should be passed as JSON

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

// Create a new message  -- Post a new message
const messages = [welcomeMessage];
app.post("/message", function (req, res) { 
  console.log (req.body);
  const id = req.body.id;
})

//Read all messages  -- Get all message
app.get("/message", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});





// Read (GET) one message specified by an ID


 // Delete a message, by ID
 app.delete("/message/:id", function (req, res){
   const id = req.params.id;
   welcomeMessage = welcomeMessage.filter((message) => message.id !== req.params.id);

  res.status(204); // No data
  res.end(); // Response body is empty
 });


 // level 2 _reject_ requests to create messages if the message objects have an empty or missing `text` or `from` property.

 const missingMessage
    if (missingMessage.from.length || missingMessage.text.length ===0) {
      res.status(400); // Bad request
      res.send({ message: "Request rejected because message content is empty" });
    }

app.listen(3000, () => console.log("Running on port 3000"));
