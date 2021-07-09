const express = require("express");
const cors = require("cors");
const { response, request } = require("express");
// to generate id
const uuid = require("uuid");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
// read all ;
app.get("/messages", (request, response) => {
  const recentTenMessage = messages.slice(0, 10);
  response.send(recentTenMessage);
});

/*** This is the combination of Level 1 - create a new message. Level 2-simple validation
 * Level 4-store a timestamp in each message object, in a field called `timeSent`
 * */
app.post("/messages", (request, response, next) => {
  const newMember = {
    id: parseInt(uuid.v4()),
    from: request.body.from,
    text: request.body.text,
    timeSent: new Date().toLocaleDateString()
  };
  if (!newMember.from || !newMember.text) {
    response
      .status(404)
      .json({
        message: "Please make sure both from and to textbox are filled"
      });
  }
  messages.push(newMember); // this add a new member
  response.json(messages);
});

//Level-1-read one message specified by an ID
app.get("/messages/:id", (request, response) => {
  // we can have an else statament in case the user enter a number that are not found in the array
  // For this we can have use the some method which would run a condition based on the true of false.So this mean that if the user enter a parameter id value that correspond with the id in the
  //array. That specific Id info would be return. else a message is print to a user
  const found = messages.some(
    (message) => message.id === parseInt(request.params.id)
  );
  if (found) {
    response.json(
      messages.filter((message) => message.id === parseInt(request.params.id))
    );
  } else {
    response
      .status(404)
      .json({ message: `No member with the Id of ${request.params.id}` });
  }
});

//delete functionality
app.delete("/messages/:id", (request, response) => {
  //const { id }= parseInt(request.params);
  const searchTheId = messages.some(
    (message) => message.id === request.params.id
  );

  if (searchTheId) {
    const deleteMessage = messages.filter(
      (message) => message.id != request.params.id
    );
    response
      .status(200)
      .json({
        message: `The message with the id ${request.params.id} was sucefully deleted`
      })
      .send(deleteMessage);
  } else {
    response
      .status(404)
      .json({
        message: `No message with the id ${request.params.id} could be found`
      });
  }
});

//Level 3 - more "read" functionality--Read _only_ messages whose text contains a given substring: `/messages/search?text=express`
app.get("/messages/search", (request, response) => {
  let textSearch = request.query.text;
  const checkFound = messages.some((message) =>
    message.text.toLowerCase().includes(textSearch)
  );

  if (checkFound) {
    response
      .status(200)
      .json(
        messages.filter((message) => message.text.toLowerCase().includes(text))
      );
  } else {
    response
      .status(404)
      .json({ message: `No message is found with the text of ${textSearch}` });
  }
});

/***  level 5 update messages
when we update something in the server we make use of the put() request
*/
app.put("messages/:id", (req, res) => {
  // check if the id exist
  const found = messages.some(
    (message) => message.id === parseInt(req.params.id)
  );
  if (found) {
    const updateMember = req.body;
    messages.forEach((message) => {
      if (message.id === parseInt(req.params.id)) {
        // since we want to update, let it have the value of what the user would enter
        message.name = updateMember.name ? updateMember.name : member.name;
        message.email = updateMember.email ? updateMember.email : member.email;

        res.json({ message: `Member updated`, member });
      }
    });
    res.json(
      messages.filter((message) => message.id === parseInt(req.params.id))
    );
  } else {
    res
      .status(404)
      .json({ message: `No member with the Id of ${req.params.id}` });
  }
});

//port listener
app.listen(PORT, (request, response) => {
  console.log(`Server is listening to port ${PORT}`);
});
