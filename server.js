const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const uri = process.env.URI;

// main route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// the route which shows all massages
app.get("/messages", (req, res) => {
  const client = new mongodb.MongoClient(uri);

  client.connect(() => {
    const db = client.db("chat");
    const collection = db.collection("messages");

    collection.find().toArray((err, result) => {
      res.send(err || result);
      client.close();
    });
  });
});

//this function generate a specific random id
const randId = () => {
  return Math.floor(Math.random() * 1000000000);
};

// the route which add on message
app.post("/messages/add", (req, res) => {
  const client = new mongodb.MongoClient(uri);

  client.connect(() => {
    const db = client.db("chat");
    const collection = db.collection("messages");

    const timeSent = new Date();

    if (req.body.from && req.body.text) {
      const name = req.body.from;
      const messageText = req.body.text;
      const message = {
        from: name,
        text: messageText,
        timesent: timeSent,
      };

      collection.insertOne(message, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ success: true });
        }
        client.close();
      });
    } else {
      res.status(406).send("please write a message with your name");
    }
  });
});

//this is the route which updates the messages
app.put("/messages/:id", (req, res) => {
  const client = new mongodb.MongoClient(uri, { useUnifiedTopology: true });

  client.connect(() => {
    const db = client.db("chat");
    const collection = db.collection("messages");

    if (!mongodb.ObjectID.isValid(req.params.id)) {
      res.status(400).send("Please enter a correct 'id'!");
    }

    const id = new mongodb.ObjectID(req.params.id);
    const name = req.body.from;
    const messageText = req.body.text;

    const searchedObj = {
      _id: id,
    };
    const message = {
      $set: {
        from: name,
        text: messageText,
      },
    };
    collection.findOneAndUpdate(searchedObj, message, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
});

//the route which search the messages by text
app.get("/messages/search", (req, res) => {
  const text = req.query.text;
  if (text) {
    const message = messages.filter((message) =>
      message.text.toLowerCase().includes(text.toLowerCase())
    );
    res.send(message);
  } else {
    res
      .status(400)
      .send("please enter a value for property 'text' to fine the messages");
  }
});

//this route shows the most recent 1 messages
app.get("/messages/latest", (req, res) => {
  const client = new mongodb.MongoClient(uri);
  client.connect(()=>{
    const db = client.db("chat");
    const collection = db.collection("messages");
    collection.find().toArray((err, results)=>{
      if(err){
        return res.status(500).send(err)
      }else{
        res.send(results.slice(results.length - 10, results.length));
      }
    })
  })
});

// the route which shows one massage by id
app.get("/messages/:id", (req, res) => {
  const client = new mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("chat");
    const collection = db.collection("messages");
    const string = req.params.id;
    if(!mongodb.ObjectID.isValid(string)){
      return res.status(400).send('The id is not correct!')
    }
    const id = new mongodb.ObjectID(string);
    const searchedObj = {
      _id: id,
    };
    collection.find(searchedObj).toArray((err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
      client.close();
    });
  });
  // const messageId = Number(req.params.id);
  // const message = messages.filter((message) => message.id === messageId);
  // res.send(message);
});

// the route which delete one massage by id
app.delete("/messages/:id", (req, res) => {
  const client = new mongodb.MongoClient(uri);
  client.connect(() => {
    const db = client.db("chat");
    const collection = db.collection("messages");

    const string = req.params.id;
    const id = new mongodb.ObjectID(string);
    const searchedObj = {
      _id: id,
    };
    collection.deleteOne(searchedObj, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
      client.close();
    });
  });
});

const myport = process.env.PORT || 5001;
app.listen(myport, () => console.log("your app is listening ", myport));
