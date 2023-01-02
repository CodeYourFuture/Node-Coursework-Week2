const express = require("express");
const cors = require("cors");
const { request } = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

const myMessage = {
  id: 1,
  from: "Jade",
  text: "test"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage, myMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
let maxID = Math.max(...messages.map(c => c.id));
// create a message
app.post("/messages",  (req, res) => {
  if (!req.body.from && !req.body.text){   
    res.status(400).send("You must include a name and text in your request")
  } 
else{
  const { from, text } = req.body;
  let newMessage = {
    id: ++maxID,
    from,
    text
  }

  messages.push(newMessage)
  res.send(newMessage)
}
 
})

// read all messages
app.get("/messages", (req, res) => {
  res.json(messages)
})

// read one message specified by id
app.get("/messages:id", (req, res) => {
  messages.findOne({
    _id: req.params.id
  })
  .then((message) =>{
    res.status(200).json(message);
  })
  .catch(
    (error) => {
      res.status(404).json({
        error: error,
      })
    }
  )
})
// delete a message specified by id
app.delete("/messages:id", (req,res) => {
  messages.deleteOne({_id: req.params.id})
  .then(() =>{
    res.status(200).json({
      message: "message deleted!",
    });
  })
  .catch((error) =>{
    res.status(400).json({
      error: "error",
    });
  });
});



const port = process.env.PORT || 4200;
app.listen(port, () =>{
  console.log(`listening on port : ${port}`)
});
