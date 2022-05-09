const express = require("express");
const cors = require("cors");
const messages = require("./routes/messages");
const app = express();
const port = process.env.PORT || 8090;

app.use(cors());

app.use(express.json());

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
