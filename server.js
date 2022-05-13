const express = require("express");
const cors = require("cors");

const app = express();

// app.use(bodyParser.json());
// Body Parser Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(cors());

const PORT = process.env.PORT || 5000;

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// I added more than 10 messages so that I could test /messages/latest even when the server restarts
messages.push(
  {
    id: 1,
    from: "Abraham Lincoln",
    text: "It’s not the years in your life that count. It’s the life in your years.",
  },
  {
    id: 2,
    from: "Benjamin Franklin",
    text: "Either write something worth reading or do something worth writing.",
  },
  {
    id: 3,
    from: "Teddy Roosevelt",
    text: "Do what you can, where you are, with what you have.",
  },
  {
    id: 4,
    from: "Rosa Parks",
    text: "I have learned over the years that when one’s mind is made up, this diminishes fear.",
  },
  {
    id: 5,
    from: "Vincent van Gogh",
    text: "I would rather die of passion than of boredom.",
  },
  {
    id: 6,
    from: "Albert Einstein",
    text: "A person who never made a mistake never tried anything new.",
  },
  {
    id: 7,
    from: "Benjamin Franklin Junior",
    text: "I didn’t fail the test. I just found 100 ways to do it wrong.",
  },
  {
    id: 8,
    from: "Leonardo da Vinci",
    text: "I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.",
  },
  {
    id: 9,
    from: "Booker T. Washington",
    text: "If you want to lift yourself up, lift up someone else.",
  },
  {
    id: 10,
    from: "Marie Curie",
    text: "We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.",
  },
  {
    id: 11,
    from: "Sheryl Sandberg",
    text: "If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.",
  }
);

let idCounter = 100; // Generate a unique ID

// GET - SHOW THE FORM

app.get("/", function (request, response) {
  response.json({ success: "Server has Loaded", message: [] }); // Indicate that the server has loaded
});

// GET - return all messages

app.get("/messages", (req, res) => {
  res.json(messages);
});

// GET - Read only messages whose text contains a given substring: /messages/search?text=express

app.get("/messages/search", function (request, response) {
  if ("query" in request && "text" in request.query) {
    const searchTerm = request.query.text.toLowerCase();
    const results = messages.filter(({ text }) =>
      text.toLowerCase().includes(searchTerm)
    );
    response.send(results);
  } else {
    response.send([]);
  }
});

// GET - Read only the most recent 10 messages: /messages/latest

app.get("/messages/latest", function (request, response) {
  response.send(messages.slice(-10));
});

// GET - Read one message specified by an ID

app.get("/messages/:id", (request, response) => {
  let numId = Number(request.params.id);
  if (Number.isNaN(numId) || !Number.isSafeInteger(numId) || numId < 0) {
    return response.status(400).json({
      errormessage: `'${request.params.id}' has been rejected because an ID must be a nonnegative integer`,
    });
  }

  let theMessageIndex = messages.findIndex(({ id }) => id === numId);
  if (theMessageIndex < 0) {
    return response.status(400).json({
      errormessage: `No message with the ID '${request.params.id}' exists`,
    });
  }
  response.json(messages[theMessageIndex]);
});

// POST - Create a new message
// Tested with Postman

app.post("/messages", (request, response) => {
  //console.log(request)
  const { from, text } = request.body; // Destructuring
  // response.send(request.body)

  // 'OR' - That is neither must be blank
  if (!from || !text) {
    return response.status(400).json({
      errormessage: `Error: ensure that both the 'from' and 'text' fields are not blank`,
    });
  } else {
    messages.push({
      id: idCounter++,
      from: from,
      text: text,
      timeSent: Date.now(),
    });
    response.json({ success: "Message Created", message: messages.slice(-1) }); // Return the one that had just been created
  }
});

// PUT - Update a message
// Tested with Postman

app.put("/messages/:id", (request, response) => {
  let numId = Number(request.params.id);
  if (Number.isNaN(numId) || !Number.isSafeInteger(numId) || numId < 0) {
    return response.status(400).json({
      errormessage: `'${request.params.id}' has been rejected because an ID must be a nonnegative integer`,
    });
  }

  let theMessageIndex = messages.findIndex(({ id }) => id === numId);
  if (theMessageIndex < 0) {
    return response.status(400).json({
      errormessage: `No message with the ID '${request.params.id}' exists`,
    });
  }

  const { from, text } = request.body; // Destructuring

  // 'AND' - That is only one is allowed to be blank
  if (!from && !text) {
    return response.status(400).json({
      errormessage: `Error: both 'from' and 'text' fields are blank. At least one of them must have a value`,
    });
  }

  // Update accordingly
  if ("from" in request.body) {
    messages[theMessageIndex].from = from;
  }
  if ("text" in request.body) {
    messages[theMessageIndex].text = text;
  }

  response.json({
    success: "Message Updated",
    message: messages[theMessageIndex],
  }); // Return the one that had just been amended
});

// DELETE - Delete a message
// Tested with Postman

app.delete("/messages/:id", (request, response) => {
  let numId = Number(request.params.id);
  if (Number.isNaN(numId) || !Number.isSafeInteger(numId) || numId < 0) {
    return response.status(400).json({
      errormessage: `'${request.params.id}' has been rejected because an ID must be a nonnegative integer`,
    });
  }

  let theMessageIndex = messages.findIndex(({ id }) => id === numId);
  if (theMessageIndex < 0) {
    return response.status(400).json({
      errormessage: `No message with the ID '${request.params.id}' exists`,
    });
  }

  let removed = messages[theMessageIndex];

  messages.splice(theMessageIndex, 1); // Message removed IN PLACE!

  response.json({ success: "Message Deleted", message: removed }); // Return the one that had just been deleted
});

// app.listen(process.env.PORT);
//Start our server so that it listens for HTTP requests!
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
