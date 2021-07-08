const express = require("express");
const cors = require("cors");

const app = express();

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
const messages = [welcomeMessage];

app.get("/", function (request, response) {
	response.sendFile(__dirname + "/index.html");
});

//Create new message
app.post("/messages", (req, res) => {
	validateId = messages.some((message) => message.id === parseInt(req.body.id));
	if(!validateId){
	messages.push(req.body);
	res.json({ msg: "Message received", messages });
	}else{
		res.json({msg: "Id already exits",messages}).status(400);
	}
});

//Read all messages
app.get("/messages", (req, res) => {
	res.json(messages);
});

//Read one message
app.get("/messages/:id", (req, res) => {
	const messageId = parseInt(req.params.id);
	idValid = messages.some((message) => message.id === messageId);
	if (typeof messageId === "number" && idValid) {
		const filteredMessages = messages.filter(
			(message) => message.id === messageId
		);
		res.json(filteredMessages);
	} else {
		res.status(400).send("Not a valid id/id does not exist");
	}
});

//Delete message
app.delete("/messages/:id", (req, res) => {
	const messageId = parseInt(req.params.id);
	idValid = messages.some((message) => message.id === messageId);
	if (typeof messageId === "number" && idValid) {
		const filteredMessages = messages.filter(
			(message) => message.id !== messageId
		);
		res.json({ message: "Successfully deleted", filteredMessages });
	} else {
		res.status(400).send("Not a valid ID");
	}
});

const listener = app.listen(process.env.PORT);
console.log("Listening on", listener.address().port);
