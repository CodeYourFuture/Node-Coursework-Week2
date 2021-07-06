import express from "express";
import cors from "cors";

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
let messages = [welcomeMessage];

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

// Create a new message
app.post("/messages", (req, res) => {
  const newMessage = {
    id: "",
    ...req.body,
  };

  const { from, text } = newMessage;

  if (!from || from === "" || !text || text === "") {
    return res.status(400).json({ msg: "Please include a name and message" });
  }

  messages.push(newMessage);
  messages.forEach((msg, index) => (msg.id = index + 1));

  res.json(messages);
});

// Get all messages
app.get("/messages", (req, res) => res.send(messages));

// Get latest 10 messages
app.get("/messages/latest", (req, res) => res.send(messages.slice(-10)));

// Search messages
app.get("/messages/search", (req, res) => {
  const text = req.query.text;

  if (text) {
    const searchMsg = messages.filter((msg) => {
      return msg.text.toLowerCase().includes(text.toLowerCase());
    });
    res.send(searchMsg);
  } else {
    res.send("No Results Found!");
  }
});

// Get one message by id

app.get("/messages/:id", (req, res) => {
  const { id } = req.params;

  const foundMsg = messages.find((msg) => msg.id === parseInt(id));

  if (foundMsg) {
    res.json(foundMsg);
  } else {
    res.status(400).json({ msg: `Message Not Found With Id: ${id}` });
  }
});

// Delete a message by id
app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;

  const foundMsg = messages.find((msg) => msg.id === parseInt(id));

  if (foundMsg) {
    messages = messages.filter((msg) => msg.id !== parseInt(id));
    res.send(`Message Deleted with Id: ${id}`);
  } else {
    res.status(400).json({ msg: `Message Not Found With Id: ${id}` });
  }
});

// Routes
/* 
| method | example path   | behaviour              |
| ------ | -------------- | ---------------------- |
| GET    | `/messages`    | return all messages    |
| GET    | `/messages/17` | get one message by id  |
| POST   | `/messages`    | create a new message   |
| DELETE | `/messages/17` | delete a message by id |
 */

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));


