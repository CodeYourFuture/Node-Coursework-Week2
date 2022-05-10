const express = require("express");
const cors = require("cors");
const messages = require("./routes/messages");
const app = express();
const port = process.env.PORT || 8090;

app.use(cors());

// If the request has come from fetch (e.g. in React), or from Postman
// if it has come from a HTML form you need to add the line
// app.use(express.json());

// If the request has come from an HTML form:
// if it has been submitted by HTML form you need to add the line
app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
app.use("/messages", messages);

app.listen(port, () => {
  console.log("server start on " + port);
});
