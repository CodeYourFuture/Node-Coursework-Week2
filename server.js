const express = require("express");
const cors = require("cors");
const app = express();
const messagesRoute = require("./routes/messages.js")

app.use(cors());

const PORT =  process.env.PORT || 5000;

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
app.use("/", messagesRoute);


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
