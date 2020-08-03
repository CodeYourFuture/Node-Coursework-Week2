const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
const mongodb = require("mongodb");
const uri = process.env.MONGOLAB_URI;
const mongoOptions = { useUnifiedTopology: true };
const client = new mongodb.MongoClient(uri, mongoOptions);
app.use(cors());

app.use(bodyParser.json());

// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
//   timeSent: new Date(),
// };

// let messages = [welcomeMessage];

client.connect(function () {
  const db = client.db("node-project");

  app.get("/messages", function (req, res) {
    const collection = db.collection("chat-server");
    client.connect(function () {
      collection.find().toArray(function (error, messages) {
        res.send(error || messages);
      });
    });
  });

  app.post("/messages", function (req, res) {
    const collection = db.collection("chat-server");
    const addMessage = req.body;
    addMessage.timeSent = new Date();
    console.log(addMessage)
    !addMessage.from || !addMessage.text
      ? res.send(404)
      : collection.insertOne(addMessage, function (error, result) {
          res.send({ success: true });
        });
  });

  app.get("/messages/search", function (req, res) {
    let searchText = { text: req.query.text};
    const collection = db.collection("chat-server");
    client.connect(function () {
      collection.findOne(searchText, function (error, messages) {
        res.send(error || messages);
      });
    });
  });

  // app.get("/messages/latest", function (req, res) {
  //   let latest = messages.slice(-10);
  //   res.send(latest);
  // });

  // app.get("/messages/:id", function (req, res) {
  //   let messageId = req.params.id;
  //   res.send(messages.find((message) => message.id == messageId));
  // });

  // app.get("/", function (request, response) {
  //   response.sendFile(__dirname + "/index.html");
  // });

  // app.put("/messages/:id", function (req, res) {
  //   let messageId = req.params.id;
  //   messages = messages.map((message) => {
  //     if (message.id.toString() == messageId) {
  //       if (req.body.from) {
  //         message.from = req.body.from;
  //       }
  //       if (req.body.text) {
  //         message.text = req.body.text;
  //       }
  //     }
  //     return message;
  //   });

  //   res.send(messages);
  // });

  // app.delete("/messages/:id", function (req, res) {
  //   let messageId = req.params.id;
  //   messages = messages.filter(
  //     (message) => message.id.toString() !== messageId
  //   );
  //   res.send(messages);
  // });

  let port = process.env.PORT;

  app.listen(port || 5000);
});
