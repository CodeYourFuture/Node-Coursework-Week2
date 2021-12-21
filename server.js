const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const { request, response } = require("express");

const app = express();

// app.use(cors());

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
const messages = [];
app.post("/messages", function (request, response) {
  // const welcomeMessage = {
  //   id: 0,
  //   from: "Bart",
  //   text: "Welcome to CYF chat system!",
  // };
  const submissionTime = new Date().toLocaleTimeString();
  const message = {
    id: 0,
    from: request.body.from,
    text: request.body.text,
    timeSent: submissionTime,
  };
  if (!message.from || !message.text) {
    return response
      .status(400)
      .json({ msg: "Please include a name and email" });
  }

  messages.push(message);
  message.id = messages.indexOf(message) + 1;
  response.json(messages);
});

//see all messages
app.get("/messages", function (request, response) {
  response.json(messages);
});

// search
app.get("/messages/search", (request, response) => {
  function searchArray(arr) {
    let arr1 = arr.filter((message) =>
      message.text.toLocaleLowerCase().includes(request.query.text)
    );
    if (arr1.length > 0) {
      return arr1;
    } else {
      return "Word Not Found";
    }
  }
  response.json(searchArray(messages));
});

// Read only the most recent 10 messages: `/messages/latest`
app.get("/messages/latest", function (request, response) {
  response.json(messages.slice(-10));
});

//see one message
app.get("/messages/:id", (request, response) => {
  const idFilter = (request) => (message) =>
    message.id === parseInt(request.params.id);
  const found = messages.some(idFilter(request));

  if (found) {
    response.json(messages.filter(idFilter(request)));
  } else {
    response
      .status(400)
      .json({ msg: `No member with the id of ${request.params.id}` });
  }
});

// Update a message
// app.put("/messages/:id", (request, response) => {
//   const found = messages.some(idFilter(request));

//   if (found) {
//     messages.forEach((message, i) => {
//       if (idFilter(request)(message)) {
//         const updMessage = { ...message, ...request.body };
//         messages[i] = updMessage;
//         response.json({ msg: "message updated", updMessage });
//       }
//     });
//   } else {
//     res.status(400).json({ msg: `No member with the id of ${request.params.id}` });
//   }
// });

// app.listen(process.env.PORT);
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
