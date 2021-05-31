const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const welcomeMessage = {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];
let idNumber = 1;

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

//Creating a message
app.post("/messages", function (request, response) {
    console.log(request.body)
    const newMessage = {
        id: idNumber++,                                                                     //Using message.length is not functional, if you delete a message and add a new message it will have the same id as the previous message
        from: request.body.from,
        text: request.body.text,
        timeSent: new Date()
    };

    if (!request.body.from || !request.body.text) {
        response.status(400).json({ message: "please fill all fields" })             //json is used instead of send so we can parse it in client side
    } else {
        messages.unshift(newMessage);
        response.json(messages);
    }
})

//Read all messages
app.get("/messages", function (request, response) {
    let lastTenMessages = messages.slice(0, 10)
    response.json(lastTenMessages);
})

//Read a message with a given substring
app.get("/messages/search", function (request, response) {
    let givenText = request.query.text.toLowerCase();
    let searchedMessages = messages.filter(message => message.text.toLowerCase().includes(givenText));

    response.json(searchedMessages);
})

//Read a message with a specific id
app.get("/messages/:id", function (request, response) {
    let found = messages.some(message => message.id == request.params.id)

    if (found) {
        let messageId = request.params.id;
        let searchedMessage = messages.filter(message => message.id == messageId);

        response.json(searchedMessage);
    } else {
        response.status(400).json({ message: `No message with id ${request.params.id}` })
    }
})

//Delete a message with a specific id
app.delete("/messages/:id", function (request, response) {
    let found = messages.some(message => message.id == request.params.id)

    if (found) {
        let messageId = request.params.id;
        messages = messages.filter(message => message.id != messageId);

        response.json(messages);
    } else {
        response.status(400).json({ message: `No message with id ${request.params.id}` })
    }

})

//Updating a message with a specific id
app.put("/messages/:id", function (request, response) {
    let found = messages.some(message => message.id == request.params.id)

    if (found) {
        let updatedMessage = request.body;

        messages.forEach(message => {
            if (message.id == request.params.id) {
                message.text = updatedMessage.text ? updatedMessage.text : message.text;
                message.from = updatedMessage.from ? updatedMessage.from : message.from;

                response.json(message)
            }
        })

    } else {
        response.status(400).json({ message: `No message with id ${request.params.id}` })
    }
})

const listener = app.listen(process.env.PORT || 5000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

