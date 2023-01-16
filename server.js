const express = require("express");
const cors = require("cors");

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

app.get("/", function (request, response) {
  response.sendFile(
    "/home/codeyourfuture/Documents/GitHub/HTML-CSS-Coursework-Week4/Grid Project/Node-Coursework-Week2/index.html"
  );
  // response.json(messages);
  // /home/codeyourfuture/Documents/GitHub/HTML-CSS-Coursework-Week4/Grid Project
});


app.get("/messages", function (request, response) {
  // response.sendFile(
  //   "/home/codeyourfuture/Documents/GitHub/HTML-CSS-Coursework-Week4/Grid Project/Node-Coursework-Week2/index.html"
  // );
  response.json(messages);
  // /home/codeyourfuture/Documents/GitHub/HTML-CSS-Coursework-Week4/Grid Project
});

app.listen(5501, () => { 
  console.log("Server started on 5501");
});
