const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

// app.get("/",  (req, res) => {
//   res.json("you found me!");
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// app.get("message/thisClashes", (req, res) => {
//   res.json("theClashes");
// });

app.get("/message/messageId", (req, res) => {
  const { messageId } = req.params;
  const foundMessage = messages.find((message) => message.id === Number(messageId));

  if (foundMessage) {
    return res.json(foundMessage);
  } else {
    return res.status(404).json("sorry, didn't find anything")
  };
});

app.delete("/message/:messageId", (req, res) => {
  const { messageId } = req.params;

  const foundMessagesIndex = messages.findIndex((message) => message.id === Number(messageId));

  if(foundMessageIndex > -1) {
    res.json(messages[foundMessageIndex]);
    messages.splice(foundMessageIndex, 1);
  } else {
    res.status(404).json(`couldn't find an item with the id ${messageId}`);
  };
});

app.get("/messages/search", (req, res) => {
  const { test } = req.query;

  const filteredMessages = messages.filter((message) => message.text.includes(text));
  res.json(filteredMessages);
});

app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(-10));
});

app.get("/messages", (req, res) => {
  const { id } = req.query;
  if (id !== undefined) {
    const messageToReturn = messages.find((message) => message.id === Number(id)
    );
    return res.json(messageToReturn);
  };
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  if (from === undefined || from === "" || text === undefined || text === "") {
    const helpfulMessage = {
      msg: `wrong input for ${!from ? "from" : "text"}`,
    };
    return res.status(400).json(helpfulMessage);
  }
  const ourMessageObject = {
    id: messages,length,
    from,
    text,
  };
  messages.push(ourMessageObject);
  res.json("you've POST /messages")
});



app.listen(9000, () => "app now listening on port 9000");
