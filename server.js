const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
	id: 0,
	from: 'Bart',
	text: 'Welcome to CYF chat system!',
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/index.html');
});

app.get('/messages', (req, res) => {
	res.status(200).send(messages);
});

app.get('/messages/:id', (req, res) => {
	let id = req.params.id;
	let messageById = messages.find((message) => message.id == id);
	if (messageById) {
		res.status(202).send(messageById);
	} else {
		res.status(404).send({ message: 'No messages with such id' });
	}
});

app.post('/messages', (req, res) => {
	let id = req.body.id;
	let from = req.body.from;
	let text = req.body.text;
	if (id.length === 0 || from.length === 0 || text.length === 0) {
		res.status(400).send('Check your data');
	} else {
		let newMessage = {
			id: id,
			from: from,
			text: text,
			timeSent: new Date(),
		};
		messages.push(newMessage);
		res.status(202).send(messages);
	}
});

app.delete('/messages/:id', (req, res) => {
	let id = req.params.id;
	id = +id;
	let newMessages = messages.filter((message) => message.id !== id);
	if (newMessages.length !== messages.length) {
		messages = newMessages;
		res.status(202).send(newMessages);
	} else {
		res.status(404).send({ message: 'No messages with such id' });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server is running on port ' + PORT);
});
