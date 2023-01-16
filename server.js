const express = require('express');
const cors = require('cors');
const PORT = 5000;
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || PORT, function () {
	console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});

const welcomeMessage = [
	{
		id: 0,
		name: 'Bart',
		message: 'Welcome to CYF chat system!',
	},
	{
		id: 1,
		name: 'Jane',
		message: 'Hello Everyone!!',
	},
	{
		id: 2,
		name: 'Beth',
		message: 'Happy to be here!!',
	},
	{
		id: 3,
		name: 'Meron',
		message: 'Welcome to the Family!',
	},
	{
		id: 4,
		name: 'Anosh',
		message: 'Happy for you to join us!',
	},
];



//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = welcomeMessage;

//  get the index file
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// get /READ  all the messages
app.get("/messages", function (request, response) {
  response.status(200).json({ messages });
});

//  get / read a messsage by a specific ID

app.get("/messages/:id", function (request, response) {
  const found = messages.filter(
    (eachmessage) => eachmessage.id === parseInt(request.params.id)
  );

  // console.log(found);

  if (found) {
    response
      .status(200)
      .json(
        messages.filter(
          (eachmessage) => eachmessage.id === parseInt(request.params.id)
        )
      );
  } else {
    response.status(400).json({
      message: `No message with the id of ${request.params.albumId}`,
    });
  }
});

//  - [ ] Create a new message /POST
app.post("/messages/createNewMessage", function (request, response) {
  const createNewMessage = {
    id: request.body.id,
    name: request.body.name,
    message: request.body.message,
  };
  if (
    !createNewMessage.id ||
    !createNewMessage.name ||
    !createNewMessage.message
  ) {
    return response
      .status(404)
      .json({
        message: `Please include a message ID, from who the message is sent & the text`,
      });
  } else {
    messages.push(createNewMessage);
    response.status(200).json(messages);
  }
});

// - [ ] Delete a message, by ID

app.delete("/messages/:id", function (request, response) {
  const found = messages.filter(
    (eachmessage) => eachmessage.id === parseInt(request.params.id)
  );

  if (found) {
    response.status(200).json({
      message: `DELETED  the message with the id of ${request.params.id}`,
      messages: messages.filter(
        (eachmessage) => eachmessage.id !== parseInt(request.params.id)
      ),
    });
  } else {
    response.status(400).json({
      message: `No message with the id of ${request.params.albumId}`,
    });
  }
});