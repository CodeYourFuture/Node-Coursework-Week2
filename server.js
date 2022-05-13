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

app.get("/",  (req, res) => {
  res.json("you found me!");
});

app.get("message/thisClashes", (req, res) => {
  res.json("theClashes");
});

app.get("/message/messageId", (req, res) => {
  const { messageId } = req.params;
  const foundMessage = messages.find((message) => message.id === Number(messageId));

  if (foundMessage) {
    return res.json(foundMessage);
  } else {
    return res.status(404).json("sorry, didn't find anything")
  };
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



app.listen(9000, () => "app now listening on port 9000");
