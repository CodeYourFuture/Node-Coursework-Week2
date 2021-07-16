const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




// Homepage Route
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

// Messages API Routes
app.use('/Messages', require('./routes/api/messages'));

app.listen(PORT);