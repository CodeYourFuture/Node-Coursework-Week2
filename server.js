const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Jonathan",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Create a new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: "",
    ...req.body
  };

  if (
    !newMessage.from ||
    newMessage.from === "" ||
    !newMessage.text ||
    newMessage.text === ""
  ) {
    return res.status(400).json({ msg: "Please include a name and message" });
  }

  messages.push(newMessage);
  messages.forEach((msg, index) => (msg.id = index + 1));

  res.json(messages);
});

// Get all messages
app.get("/messages", (req, res) => res.send(messages));

// Search messages
app.get('/messages/search', (request, response, next) => {
  const text = request.query.text;
 
  if(text) {
    const searchMsg = messages.filter(msg => {
      return msg.text.toLowerCase().includes(text.toLowerCase()) 
    });
    response.send(searchMsg);
  } else {
    response.send([]);
  }
});

// Get one message by id
const idMessage = (req) => (message) => message.id === parseInt(req.params.id);
app.get("/messages/:id", (req, res) => {
  const foundMsg = messages.some(idMessage(req));

  if (foundMsg) {
    res.json(messages.filter(idMessage(req)));
  } else {
    res.status(400).json({ msg: `No message with the id: ${req.params.id}` });
  }
});

// Delete a message by id
app.delete("/messages/:id", (req, res) => {
  const deleteMsg = messages.some(idMessage(req));

  if (deleteMsg) {
    res.json({
      msg: `Message deleted with id: ${req.params.id}`,
      messages: messages.filter((message) => !idMessage(req)(message)),
    });
  } else {
    res.status(400).json({ msg: `No message with the id: ${req.params.id}` });
  }
});



app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

/* [ ] Create a new message
- [ ] Read all messages
- [ ] Read one message specified by an ID
- [ ] Delete a message, by ID
 */

/* | method | example path   | behaviour              |
| ------ | -------------- | ---------------------- |
| GET    | `/messages`    | return all messages    |
| GET    | `/messages/17` | get one message by id  |
| POST   | `/messages`    | create a new message   |
| DELETE | `/messages/17` | delete a message by id |
 */
