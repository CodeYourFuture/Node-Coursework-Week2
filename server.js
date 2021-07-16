const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json())

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.use('/messages', require('./routes/message-api'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server Running On Port: ${port}`);
});
