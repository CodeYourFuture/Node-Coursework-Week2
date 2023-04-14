const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const messageRouter = require("./messageRoutes")


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.use("/messages", messageRouter)

app.listen(process.env.PORT ?? 4000);