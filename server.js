const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!"
  },
  {
    id: 1,
    from: "Baz",
    text: "Hello Bart"
  },
  {
    id: 2,
    from: "Bart",
    text: "Hi Baz, How are you?"
  },
  {
    id: 3,
    from: "Baz",
    text: "I'm ok, thank you"
  },
  {
    id: 4,
    from: "Bart",
    text: "What are you doing today?"
  },
  {
    id: 5,
    from: "Baz",
    text: "I am trying to learn Express!"
  },
  {
    id: 6,
    from: "Bart",
    text: "Well done"
  },
  {
    id: 7,
    from: "Baz",
    text: "I just found out Express routing has specificity and that caused me a headache because i didn't know that before now!"
  },
  {
    id: 8,
    from: "Bart",
    text: "Yes, you need to declare the routes in specificity order to avoid issues. Or you can use more specific URL routes to help avoid issues with that."
  },
  {
    id: 9,
    from: "Baz",
    text: "I need 11 messages on here to be able to test the /messages/latest/ route!"
  },
  {
    id: 10,
    from: "Bart",
    text: "Okay, let's keep talking then!"
  },
  {
    id: 11,
    from: "Baz",
    text: "I think this is the 11th message now :)"
  },
  {
    id: 12,
    from: "Bart",
    text: "Great, go try and make the route work, good luck!"
  }
]

app.get("/", function (req, res) {
  // console.log("GET / route")
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", function(req, res) {
  // console.log("GET /messages route")
  res.send(messages);
});

app.get("/messages/latest", function (req, res) {
  const lastTenMessages = messages.slice(messages.length - 10);
  res.send(lastTenMessages);
});

app.get("/messages/search", function (req, res) {
  // console.log("GET /messages/search?text= route");
  const searchQuery = req.query.text;
  const searchResults = messages.filter(element => element.text.toLowerCase().includes(searchQuery.toLowerCase()));
  res.send(searchResults);
});

app.get("/messages/:id", function(req, res) {
  // console.log("GET /messages/:id route")

  // I SPENT WAY TOO LONG WORKING THIS OUT!!
  // WE HAVE TO TYPE CONVERT THE STRING REQUEST TO NUMBER FOR ID IN THE OBJECT
  console.log(`req.params.id : ${req.params.id}`);
  console.log(`req.params.id is type ${typeof req.params.id}`)
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