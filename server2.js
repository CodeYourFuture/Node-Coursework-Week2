//load the 'express' module which makes writing webservers easy
const express = require("express");
const app = express();
const port = process.env.PORT || 5555;

// app.get("/", function (request, response) {
//   response.send("hello Express world!");
// });

app.use(express.static(__dirname + "/public/index2.html"));
app.listen(port, () => {
  console.log("server is running port:" + port);
});
