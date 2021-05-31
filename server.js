const express = require("express");
const cors = require("cors");
const messages = require("./Routes/messages");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.use("/messages", messages);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});
