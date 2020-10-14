const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json())

app.use(cors());

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
    
  }]

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
// const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//////////////////////Create a new message//////////////////////////// 
 app.post('/messages/', (req, res) =>{
  let newId = messages[messages.length -1].id + 1
  let newMessage = {
        id: newId,
        from: req.body.from,
        text: req.body.text,
        created_at :new Date().toISOString()
      };
 
  if((newMessage.from !== undefined) && (newMessage.from.length > 0) && (newMessage.text !== undefined)&& (newMessage.from.length > 0) ){
  messages.push(newMessage)
  res.json(messages)
    }
    else{
      res.status(400).send("Please post a validate message")
    }
    })
////////////////////////Read all messages//////////////////////////
app.get('/messages', (req, res) => {
  res.json(messages)
})
/////////////////////////Read one message specified by an ID///////////////////////////
app.get('/messages/:id', (req, res) => {
  const mesId = Number(req.params.id);
  const result = messages.find(ms => ms.id === mesId)
  if (result !== undefined) {
    res.json(result)
  }
  else {
    res.status(404).send("sorry not found")
  }
})
///////////////////Delete a message, by ID/////////////////////////////////////////////////
app.delete('/messages/:id', (req, res) => {
  const delId = Number(req.params.id);
  const index = messages.findIndex(ms => ms.id === delId)
  if (index !== undefined) {
    messages.splice(index, 1)
    res.json("DELETED!!!")
  }
  else {
    res.status(404).send("sorry not found")
  }
})
////////////////////level 2 /////////////////////////////////
app.post('/messages/', (req, res) =>{
  let newId = messages[messages.length -1].id + 1
  let newMessage = {
        id: newId,
        from: req.body.from,
        text: req.body.text,
        created_at :new Date().toISOString()
      };
 
  if((newMessage.from !== undefined) && (newMessage.from.length > 0) && (newMessage.text !== undefined)&& (newMessage.from.length > 0) ){
  messages.push(newMessage)
  res.json(messages)
    }
    else{
      res.status(400).send("Please post a validate message")
    }
    })
///////////////////level 3 /////////////////////////////////
app.get("/messages5/search", function(req, res) {
  let text = req.query.text
  // console.log(req.query);
   if (text !=undefined){
 const result = messages.filter(word => (word.text.toLowerCase().includes(text.toLowerCase())))
    res.send(result)
    // console.log(result);
  }
  else{
    res.send([])
  }
});
////////////updated /////////////////////////////
app.put('/messages/:id',  (req, res) => {
  const postId = req.params.id
  let updatedMessage = {
    from: req.body.from,
    text: req.body.text,
    updated_at :new Date().toISOString()
  }
  const checkedMessage = messages.find(u => u.id === parseInt(postId))
 if(checkedMessage !== undefined){
  if((updatedMessage.from !== undefined)&&(updatedMessage.from.length > 0) && (updatedMessage.text !== undefined)&&(updatedMessage.text.length > 0) ){
    checkedMessage.from = updatedMessage.from
    checkedMessage.text = updatedMessage.text
  checkedMessage.updated_at = new Date().toISOString()
 
res.send("message updated")
}
    else{
      res.status(400).send("wrong request")
    
    }}
    else{
      res.status(404).send("user does not exist")
    }
    })
////////////last 10 msg//////////////////////////
app.get('/messages2/last', (req, res) => {
  let lastMsg = messages.slice(-10);

  res.json(lastMsg)
})

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
// app.listen(3000, () => {
//   console.log("Your app is listening on port " + 3000);
// })
