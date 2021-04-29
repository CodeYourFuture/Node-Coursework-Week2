import express from 'express';
import cors from 'cors';
import path from 'path';
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

const app = express();
app.use(express.json());
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

let counter = 1;

app.use(express.urlencoded({extended: false, limit: "20mb"}));

app.get("/messages", (req, res) => {
  res.json(messages);
});

const messageValidator = (newMessage, messageWithExistingID) => {
  let result;
  if (newMessage.from && newMessage.text && !newMessage.id) {
    newMessage.id = counter;
    counter++;
    messages.push(newMessage);
    result = {status: 201, body: messages};
  } else if (newMessage.from && newMessage.text && newMessage.id && !messageWithExistingID) {
    messages.push(newMessage);
    result = {status: 201, body: newMessage};
  } else if (messageWithExistingID) {
    result = {status: 400, body: {message: `A message with ID ${newMessage.id} already exists.`}};
  } else {
    result = {status: 400, body: {message: "The message doesn't have the required fields"}};
  }
  return result;
}

app.post("/messages", (req, res) => {
  const newMessage = req.body;
  const messageWithExistingID = messages.some(message => message.id === newMessage.id)
  const responseObject = messageValidator(newMessage, messageWithExistingID);
  res.status(responseObject.status);
  res.send(responseObject.body);
});

app.get("/messages/:id", (req, res) => {
  const id = req.params.id;
  const messageById = messages.find(message => message.id.toString() === id);
  res.json(messageById);
});

app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  const messageIndex = messages.findIndex(message => message.id.toString() === id);
  messages.splice(messageIndex, 1);
  res.json({message: `A message by the ID ${id} is deleted from the database.`});
});

app.get("/messages/search", (req, res) => {
  const searchTerm = req.query.text.toLowerCase();
  const searchResult = messages.filter(message => message.text.toLowerCase().includes(searchTerm));
  
  const letters = /^[A-Za-z\s]+$/;
	if (!searchTerm.match(letters)) {
		res.status(400).json({
			message:
				"Please make sure your search keywords contain no characters rather than letters.",
		});
	} else if (searchResult.length < 1) {
		res.status(400).json({
			message:
				"Your search keyword isn't found in any messages. Please try another keyword.",
		});
	} else res.send(searchResult);
});

app.get("/messages/latest", (req, res) => {
  const recentMessages = messages.slice(Math.max(messages.length - 10, 0));
  if (search && messages.length < 10) res.json(messages);
  else res.json(recentMessages);
});

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
