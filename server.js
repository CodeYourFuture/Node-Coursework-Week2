const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const messages = require("./messages.json");
// console.log(messages);

app.get("/", function (req, res) {
  // console.log("GET / route")
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", function(req, res) {
  // console.log("GET /messages route")
  res.send(messages);
});

app.get("/messages/latest", function (req, res) {
  // console.log("GET /messages/latest route")
  const lastTenMessages = messages.slice(messages.length - 10);
  res.send(lastTenMessages);
});

app.get("/messages/search", function (req, res) {
  // console.log("GET /messages/search?text= route");
  const searchQuery = req.query.text;
  const searchResults = messages.filter(element => element.text.toLowerCase().includes(searchQuery.toLowerCase()));
  if (searchResults.length) {
    res.send(searchResults);
  } else {
    res.status(400);
    res.send(`A message including the text ${req.query.text} does not exist`);
  }
});

app.get("/messages/:id", function(req, res) {
  // console.log("GET /messages/:id route")

  // I SPENT WAY TOO LONG WORKING THIS OUT!!
  // WE HAVE TO TYPE CONVERT THE STRING REQUEST TO NUMBER FOR ID IN THE OBJECT
  // console.log(`req.params.id : ${req.params.id}`);
  // console.log(`req.params.id is type ${typeof req.params.id}`)
  // console.log(`messages[0].id : ${messages[0].id}`)
  // console.log(`messages[0].id is type ${typeof messages[0].id}`)
  
  const message = messages.find(element => element.id === Number(req.params.id));
  // console.log(`message : ${message}`);
  if (message) {
    res.send(message);
  } else {
    res.status(400);
    res.send(`A message with the id ${req.params.id} does not exist`);
    // return next(err);
    // ^learning about express default error handler
    // but this needs (err, req, res, next) in the app.get parameters
    // https://expressjs.com/en/guide/error-handling.html
  }
});

app.post("/messages", function(req, res) {
  // console.log("POST /messages route")
  // console.log(req.body)
  if (req.body.from && req.body.text) {
    const newMessage = {
      id: messages.length,
      from: req.body.from,
      text: req.body.text,
      timeSent: new Date(),
    };
    messages.push(newMessage);
    res.redirect('/');
  } else {
    res.status(400);
    if (!req.body.from && !req.body.text) {
      res.send(`You didn't submit your Name or your Message`);
    } else if (!req.body.from) {
      res.send(`You didn't submit your Name`);
    } else if (!req.body.text) {
      res.send(`You didn't submit your Message`)
    }
    // ^not sure how best to return these...
  }
});

app.put("/messages/:id", function(req,res) {
  console.log(`req.params.id ${req.params.id}`);
  console.log(`req.body ${req.body}`)
  const indexOfMessageId = messages.findIndex(element => element.id === Number(req.params.id));
  // console.log(indexOfMessageId);
  console.log(messages[indexOfMessageId]);
  if (indexOfMessageId) {
    if (req.body.from && req.body.text) {
      messages[indexOfMessageId].from = req.body.from;
      messages[indexOfMessageId].text = req.body.text;
      res.send(`Updated message with id ${req.params.id} with Name ${req.body.from} and with Message ${req.body.text}`)
    } else if (req.body.from) {
      messages[indexOfMessageId].from = req.body.from;
      res.send(`Updated message with id ${req.params.id} with Name ${req.body.from}`)
    } else if (req.body.text){
      messages[indexOfMessageId].text = req.body.text;
      res.send(`Updated message with id ${req.params.id} with Message ${req.body.text}`)
    }
  } else {
    res.status(400);
    res.send(`A message with the id ${req.params.id} does not exist to update`);
  }
});

app.delete("/messages/:id", function(req, res) {
  // console.log("DELETE /messages/:id route");

  const indexOfMessageId = messages.findIndex(element => element.id === Number(req.params.id));
  // console.log(`indexOfMessageId ${indexOfMessageId}`)

  if (indexOfMessageId > -1) {
    // console.log(`message with id ${req.params.id} is index ${indexOfMessageId}`)
    // console.log(`Array BEFORE DELETE: ${messages}`);
    messages.splice(indexOfMessageId, 1);
    // console.log(`Array AFTER DELETE: ${messages}`);
    res.status(200);
    res.send({sucess: true});
  } else {
    // console.log(`albumId ${req.params.id} was not found`)
    res.status(400);
    res.send({success: false});
  }
});

const listener = app.listen(process.env.PORT || PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});