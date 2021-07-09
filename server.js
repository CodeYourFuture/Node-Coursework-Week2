const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const messageArray = [
	{
		id: 1,
		from: "Art",
		text: "Chat servers are cool!",
	},
	{
		id: 2,
		from: "Marge",
		text: "CYF Rocks!!!",
	},
	{
		id: 3,
		from: "Carl",
		text: "Thanks for the invite",
	},
	{
		id: 4,
		from: "FratBoy",
		text: "Where them girls at!",
	},
	{
		id: 5,
		from: "Con",
		text: "Send me money!",
	},
	{
		id: 6,
		from: "Bart",
		text: "We just went live",
	},
	{
		id: 7,
		from: "SorGirl",
		text: "Who needs the gram!",
	},
	{
		id: 8,
		from: "Jack",
		text: "Whats happening peeps!",
	},
	{
		id: 9,
		from: "Bronwyn",
		text: "Well this is quite interesting",
	},
	{
		id: 10,
		from: "Bash",
		text: "Chat system loading!",
	},
	{
		id: 11,
		from: "Jeremy",
		text: "Anyone for coffee?",
	},
];

const welcomeMessage = {
	id: 0,
	from: "Bart",
	text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = messageArray.concat(welcomeMessage);

app.get("/", function (request, response) {
	response.sendFile(__dirname + "/index.html");
});

//Create new message
app.post("/messages", (req, res) => {
	validId = messages.some((message) => message.id !== parseInt(req.body.id));
	const msgAuthor = req.body.from;
	const msgText = req.body.text;
	if (validId && msgAuthor.length > 0 && msgText.length > 0) {
		messages.push(req.body);
		res.json({ msg: "Message received", messages });
	} else {
		res
			.status(400)
			.json({ msg: "Id already exits/missing: from/missing: text", messages });
	}
});

//Read all messages
app.get("/messages", (req, res) => {
	res.json(messages);
});

//Get messages based on text substring - Place before id routes to establish hierarchy
app.get("/messages/search", (req, res) => {
	let searchString = req.query.text;
	if (searchString) {
		const filteredMessages = messages.filter((message) =>
			message.text.includes(searchString)
		);
		res.json(filteredMessages);
	} else {
		res.json({ msg: "Please enter search text" });
	}
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
