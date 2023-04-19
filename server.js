const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/index.css", function (req, res) {
  res.type("text/css");
  res.sendFile(__dirname + "/index.css");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = require("./message.json");

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

// let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(welcomeMessage);
});

app.post("/messages", function (request, response) {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString("en-UK", { hour12: false });
  const timeStamp = date + " @" + time;

  const NewMessage = {
    id: welcomeMessage.length,
    from: request.body.from,
    text: request.body.text,
    timeSent: timeStamp
  };


  if (!NewMessage.from || !NewMessage.text) {
    return response
      .status(400)
      .json({ message: "Please fill all required areas" });
  }
  welcomeMessage.push(NewMessage);
  response.json(welcomeMessage);
});

app.get("/messages/search", function (request, response) {
  const searchItems = request.query.text;
  const foundItems = welcomeMessage.filter((item) =>
    item.text.toLowerCase().includes(searchItems.toLowerCase())
  );
  response.json(foundItems);
});

app.get("/messages/latest", function (request, response) {
  const tenLatestMessages = [...welcomeMessage.slice(-10)];
  console.log(tenLatestMessages);
  response.send(tenLatestMessages);
});

app.get("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const oneMessage = welcomeMessage.find(
    (eachMessage) => eachMessage.id === parseInt(messageId)
  );
  oneMessage
    ? response.json(oneMessage)
    : response.json({ message: "message not found" });
});

app.put("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const updatedMessage = welcomeMessage.find(
    (eachMessage) => eachMessage.id === parseInt(messageId)
  );
  if (updatedMessage) {
    updatedMessage.from = request.body.from || updatedMessage.from;
    updatedMessage.text = request.body.text || updatedMessage.text;
    response.json(updatedMessage);
  } else {
    response.json({ message: "message not found" });
  }
});



app.delete("/messages/:id", function (request, response) {
  const messageId = request.params.id;
  const oneMessage = welcomeMessage.find(
    (eachMessage) => eachMessage.id === parseInt(messageId)
  );
  if (oneMessage) {
    welcomeMessage = welcomeMessage.filter(
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
