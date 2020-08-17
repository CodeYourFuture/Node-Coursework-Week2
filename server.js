const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const today = new Date();
const minutes = String(today.getMinutes()).padStart(2, "0");
const seconds = String(today.getSeconds()).padStart(2, "0");
const time = today.getHours() + ":" + minutes + ":" + seconds;
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); // Jan = 0
const yyyy = today.getFullYear();
const date = dd + "/" + mm + "/" + yyyy;
const dateTime = time + " " + date;

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
//   timeSent: dateTime,
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage];

const messages = require("./messages");

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//--------- get all posts -----------
app.get("/messages", (request, response) => {
  response.json(messages);
});

app.use(express.urlencoded({ extended: false }));

// ---------create post--------------
// app.post("/messages", (request, response) => {
//   let lastMessage = messages.length - 1;
//   let newId = messages[lastMessage].id + 1;
//   console.log(newId);
//   let newPost = {
//     id: newId,
//     from: request.body.from,
//     text: request.body.text,
//     timeSent: dateTime,
//   };
//   if (!newPost.from || !newPost.text) {
//     response.status(400).json({ message: "Invalid Request" });
//   } else {
//     messages.push(newPost);
//     response.json(messages);
//   }
// });
/// ----------get a post with specific id----------------
// app.get("/messages/:id", (request, response) => {
//   let id = parseInt(request.params.id);
//   let found = messages.find((item) => item.id === id);
//   if (found) {
//     response.json(found);
//   } else {
//     response.status(404).json({ message: "Not Found" });
//   }
// });
// -------------delete a post with a specific id --------------------
// app.delete("/message/:id", (request, response) => {
//   let id = Number(request.params.id);
//   let deletedPostIndex = messages.findIndex((item) => item.id === id);
//   console.log(deletedPostIndex);
//   if (deletedPostIndex >= 0) {
//     messages.splice(deletedPostIndex, 1);
//     console.log(messages);
//     response.json(messages);
//   } else {
//     response.status(404).json({ message: "Error" });
//   }
// });
// ---------------- read functionality----------------
// app.get("/messages/search", (request, response) => {
//   let term = request.query.term;
//   let foundTerm = messages.filter((item) =>
//     item.text.toLowerCase().includes(term.toLowerCase())
//   );
//   response.json(foundTerm);
// });
//---------------- get the last 10 messages-----------------
app.get("/messages/last", (request, response) => {
  let lastM = messages.slice(-10);
  response.json(lastM);
});
// app.listen(process.env.PORT);
const myPort = process.env.PORT || 9000;
app.listen(myPort, () => console.log(`Your app is listening to ${myPort}`));
