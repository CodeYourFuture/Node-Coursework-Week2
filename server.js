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
	console.log(req.body)
	const newMessage = {
		id: Number(messages.length),
		from: req.body.from,
		text: req.body.text
	}
	messages.push(newMessage);
	res.status(201).send(messages);
	console.log(messages)
})

app.get('/messages', (req, res) => {
	res.json(messages)
})

app.listen(3000, () => console.log('Listening on port 3000'));
