const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(express.json());

app.get("/", function (request, response) {
	response.sendFile(__dirname + "./index.html");
});

const welcomeMessage = {
	id: 0,
	from: "Bart",
	text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

const messages = [welcomeMessage];

app.get('/search', (req, res) => {
	console.log(req.query)
})

app.post('/messages', (req, res) => {
	if ((req.body.from).length >= 3 && (req.body.text).length > 0) {
		const newMessage = {
			id: Number(messages.length),
			from: req.body.from,
			text: req.body.text
		};
		messages.push(newMessage);
		res.status(201).send(messages[newMessage.id]);
	} else {
		res.status(400).send('Please make sure to make the input fields are filled correctly!')
	}
})

app.get('/messages/:ID', (req, res) => {
	const messageFound = messages.filter(mess => mess.id === Number(req.params.ID))
	if (messageFound.length > 0) {
		res.status(200).send(...messageFound)
	}
	else {
		res.status(418).send('Don\'t make coffee with the teapot 🚫\n You learned something today😉')
	}
})

app.delete('/messages/:ID', (req, res) => {
	if (messages.find(mess => mess.id === Number(req.params.ID))) {
		messages.splice(req.params.ID, 1);
		messages.map((mess, index) => mess.id = index)
		console.log(messages)
		res.status(200).send('Message deleted')
	} else {
		res.status(416).send('Not a valid ID number')
	}
})

app.get('/messages', (req, res) => {
	res.json(messages)
})

app.listen(3000, () => console.log('Listening on port 3000'));