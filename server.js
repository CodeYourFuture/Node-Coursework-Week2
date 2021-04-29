const express = require("express");
const cors = require("cors");

const messageRouter = require("./routes/messageRoute");

const app = express();

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

//Routes
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.use("/api/messages", messageRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening ${port}`);
});

exports.messages = messages;
