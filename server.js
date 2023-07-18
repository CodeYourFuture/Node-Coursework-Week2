// // const express = require("express");
// // const cors = require("cors");

// // const app = express();

// // app.use(cors());

// // const welcomeMessage = {
// //   id: 0,
// //   from: "Bart",
// //   text: "Welcome to CYF chat system!",
// // };

// // //This array is our "data store".
// // //We will start with one message in the array.
// // //Note: messages will be lost when Glitch restarts our server.
// // const messages = [welcomeMessage];

// // app.get("/", function (request, response) {
// //   response.sendFile(__dirname + "/index.html");
// // });

// // app.listen(process.env.PORT);

// // const express = require("express");
// // const cors = require("cors");
// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // const welcomeMessage = {
// //   id: 0,
// //   from: "Bart",
// //   text: "Welcome to CYF chat system!",
// // };

// // // This array is our "data store".
// // // We will start with one message in the array.
// // // Note: messages will be lost when Glitch restarts our server.
// // const messages = [welcomeMessage];

// // // Route to create a new message
// // app.post("/messages", (req, res) => {
// //   const newMessage = req.body;
// //   newMessage.id = messages.length; // Assign a new unique ID to the message
// //   messages.push(newMessage);
// //   res.json(newMessage);
// // });

// // // Route to read all messages
// // app.get("/messages", (req, res) => {
// //   res.json(messages);
// // });

// // // Route to read one message specified by an ID
// // app.get("/messages/:id", (req, res) => {
// //   const messageId = parseInt(req.params.id);
// //   const message = messages.find((msg) => msg.id === messageId);
// //   if (message) {
// //     res.json(message);
// //   } else {
// //     res.status(404).json({ error: "Message not found" });
// //   }
// // });

// // // Route to delete a message by ID
// // app.delete("/messages/:id", (req, res) => {
// //   const messageId = parseInt(req.params.id);
// //   const index = messages.findIndex((msg) => msg.id === messageId);
// //   if (index !== -1) {
// //     const deletedMessage = messages.splice(index, 1)[0];
// //     res.json(deletedMessage);
// //   } else {
// //     res.status(404).json({ error: "Message not found" });
// //   }
// // });

// // // app.listen(process.env.PORT, () => {
// // //   console.log("Your app is listening on port " + process.env.PORT);
// // // });

// // const PORT = 18080;
// // app.listen(PORT, function () {
// //   console.log("Your app is listening on port " + PORT + "......");
// // });

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

// const messages = [welcomeMessage];

// // Middleware function for validation
// function validateMessage(req, res, next) {
//   const { from, text } = req.body;
//   if (!from || !text) {
//     return res
//       .status(400)
//       .json({ error: "Both 'from' and 'text' fields are required." });
//   }
//   next();
// }

// // Create a new message
// app.post("/messages", validateMessage, function (req, res) {
//   const newMessage = req.body;
//   newMessage.id = messages.length;
//   messages.push(newMessage);
//   res.json(newMessage);
// });

// // Read all messages
// app.get("/messages", function (req, res) {
//   res.json(messages);
// });

// // Read one message specified by an ID
// app.get("/messages/:id", function (req, res) {
//   const id = parseInt(req.params.id);
//   const message = messages.find((msg) => msg.id === id);
//   if (!message) {
//     return res.status(404).json({ error: "Message not found." });
//   }
//   res.json(message);
// });

// // Delete a message by ID
// app.delete("/messages/:id", function (req, res) {
//   const id = parseInt(req.params.id);
//   const index = messages.findIndex((msg) => msg.id === id);
//   if (index === -1) {
//     return res.status(404).json({ error: "Message not found." });
//   }
//   messages.splice(index, 1);
//   res.json({ message: "Message deleted successfully." });
// });

// const PORT = 18080;
//  app.listen(PORT, function () {
//    console.log("Your app is listening on port " + PORT + "......");
//  });

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

const messages = [welcomeMessage];

// Middleware function for validation
function validateMessage(req, res, next) {
  const { from, text } = req.body;
  if (!from || !text) {
    return res
      .status(400)
      .json({ error: "Both 'from' and 'text' fields are required." });
  }
  next();
}

// Create a new message
app.post("/messages", validateMessage, function (req, res) {
  const newMessage = req.body;
  newMessage.id = messages.length;
  newMessage.timeSent = new Date();
  messages.push(newMessage);
  res.json(newMessage);
});

// Read all messages
app.get("/messages", function (req, res) {
  res.json(messages);
});

// Read one message specified by an ID
app.get("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const message = messages.find((msg) => msg.id === id);
  if (!message) {
    return res.status(404).json({ error: "Message not found." });
  }
  res.json(message);
});

// Read messages whose text contains a given substring
app.get("/messages/search", function (req, res) {
  const searchText = req.query.text;
  const filteredMessages = messages.filter((msg) =>
    msg.text.toLowerCase().includes(searchText.toLowerCase())
  );
  res.json(filteredMessages);
});

// Read the most recent 10 messages
app.get("/messages/latest", function (req, res) {
  const latestMessages = messages.slice(Math.max(messages.length - 10, 0));
  res.json(latestMessages);
});

// Update a message by ID
app.put("/messages/:id", validateMessage, function (req, res) {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Message not found." });
  }

  const updatedMessage = req.body;
  messages[index] = {
    ...messages[index],
    ...updatedMessage,
    id,
    timeSent: messages[index].timeSent,
  };
  res.json(messages[index]);
});

// Delete a message by ID
app.delete("/messages/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const index = messages.findIndex((msg) => msg.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Message not found." });
  }
  messages.splice(index, 1);
  res.json({ message: "Message deleted successfully." });
});

const PORT = 18080;
app.listen(PORT, function () {
  console.log("Your app is listening on port " + PORT + "......");
});
