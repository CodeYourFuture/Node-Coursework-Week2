const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

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

// app.get("/", function (request, response) {
//   response.send("Yay Node!");
// });

let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
  // response.send("hello gayle");
});
// app.get("/", function (request, response) {
//   response.send(`Hello, welcome to node ${messages}`);
// });

app.get("/messages", function (request, response) {
  response.json(messages);
});

app.post("/messages", function (request, response) {
  const NewMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text,
  };
  if (!NewMessage.from || !NewMessage.text){
    return response.status(400).json({message:"Please fill out all areas"});
  }
  messages.push(NewMessage);
  response.json(messages);
});

app.get("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const oneMessage = messages.find(
    (eachMessage) => eachMessage.id === parseInt(messageId)
  );
  oneMessage
    ? response.json(oneMessage)
    : response.json({ message: "message not found" });
});

app.delete("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const oneMessage = messages.find(
    (eachMessage) => eachMessage.id === parseInt(messageId)
  );
  if (oneMessage) {
    messages = messages.filter(
      (eachMessage) => eachMessage.id !== parseInt(messageId)
    );
    response.json({ message: "message deleted" });
  } else {
    response.json({ message: "message not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
