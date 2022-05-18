const express = require("express");
const cors = require("cors");
const uuid = require('uuid')


const app = express();
app.use(express.json());
app.use(cors());

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
  },
  {
    id:2,
    from: "Anvita",
    text:"I like Elsa"
  },
  {
    id:3,
    from: "Rita",
    text:"Who are you?"
  }
]


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//get message by userId
app.get('/messages/:id', (req, res) => {
  const filteredData = messages.filter(user => user.id == req.params.id)
  res.send(filteredData)
});

//delete a message by id
app.delete('/messages/:id', (req, res) => {
  const filteredData = messages.filter(user => user.id != req.params.id)
  res.send(filteredData)
});

// Read _only_ messages whose text contains a given substring:
// /messages/search?text=express
app.get('/messages/search', (req, res) => {

  const filteredData = messages.filter(message => message.text.includes(req.query.text))
 
  
  res.json(filteredData) 
 
})

// get the latest 10 messages
app.get("/messages/latest", (req, res) => {
  res.json(messages.slice(0, 1));
});


//see all the messages
app.get('/messages', (req, res) => {
  res.send(messages);
  console.log('message viewed')
})

//post all the messages
app.post('/messages', (req, res) => {
  let userID = uuid.v4()
  const newMessage = {
    
    id: userID,
    from: req.body.from,
    text: req.body.text
  }
  //get status 400 if any of the form is not filled
  if(!req.body.from === undefined || req.body.text === undefined || req.body.from === "" || req.body.text === "") {
    res.status(400)
    return res.send('Sorry, fill in all the data and try again');
  }
  messages.push(newMessage);
  res.send(messages)

})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running in port ${PORT}`));
