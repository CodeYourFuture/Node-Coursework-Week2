const express = require("express");
const cors = require("cors");

const app = express();

//  app.use(express.json())

const bp = require('body-parser');
const { response } = require("express");

app.use(bp.json());
app.use(bp.urlencoded({extended:true}));

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


let maxID = Math.max(...messages.map(c => c.id))

app.get("/", function (request, response, next) {
  response.sendFile(__dirname + "/index.html");
});

// app.get("/messages", function (request, response) {
//   response.send(welcomeMessage);
// });


app.post('/messages', (req, res,next) => {
  if (!req.body.from || !req.body.text){   
    res.status(400).send(` You must include a from and a and text in your request`)
    return
  } 
  else{
    // res.send(req.body)
    const newMessage = {
      "id": ++maxID,
      "from": req.body.from,
      "text": req.body.text
    }
    messages.push(newMessage)
      res.send(`<h1>The message has been added</h1> <button onclick="history.back()"> Go Back </button> `)
    
  }

});

// app.listen(process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} `));