const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

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
  response.sendFile(__dirname + "/index.html");
});

// create a message
app.post("/messages", (req,res) => {

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

})

const port = process.env.PORT || 4200;
app.listen(port, () =>{
  console.log(`listening on port : ${port}`)
});
