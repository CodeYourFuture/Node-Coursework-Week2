const express = require("express");
const cors = require("cors");
const { response, request } = require("express");

const app = express();
const bodyParser = require("body-parser")
app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
//data

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const messages = [welcomeMessage];

//---data



app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
app.get("/messages/search", (request, response) => {
  const result = request.query.text;
  let searchResult = messages;
  if (result) {
    searchResult.filter(item => item.text.includes(result))
  }

  response.send(searchResult)
})
app.get("/messages", (request, response) => {
  response.send(messages)
})

app.get("/messages/:id", (request, response) => {
  const idParam = Number(request.params.id);
  const findObject = messages.filter(item => item.id === idParam)
  response.send(findObject)
})

app.post("/messages", (request, response) => {
  if (request.body.from === "" || request.body.text === "") {
    response.status(400).send("please fill all the fields")
    return;
  }
  const newMessage = {
    id: messages.length,
    from: request.body.from,
    text: request.body.text
  }
  messages.push(newMessage);
  response.send(newMessage);
})
app.delete("/messages/:id", (request, response) => {
  let idFromUrl = Number(request.params.id);
  let result = messages.filter(item => item.id !== idFromUrl)
  response.send(result)
})







const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`listen to ${port}`);
});
