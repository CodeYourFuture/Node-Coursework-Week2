

const express = require("express");

const app = express();


const bodyParser = require("body-parser");

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//const cors = require("cors");
//app.use(cors());

let messages = require("./messages.json");

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.


app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

///GET ALL MESSAGES///
app.get("/messages" , (req,res) =>{
  res.json(messages)
})

////Find message by searched text
app.get("/messages/search", (req, res) => {
  const searchedText = req.query.text;
  const filteredMessage = messages.filter((item) =>
    item.text.toLowerCase().includes(searchedText.toLowerCase())
  );
  if (filteredMessage.length < 1) {
    res.sendStatus(404);
  } else {
    res.json(filteredMessage);
  }
});

///GET Latest Messages
app.get("/messages/latest", (req, res)=>{
    let latest = messages.slice(-5)
  if(messages.length < 5){
    res.json('You have less than messages')
  }

  res.json(latest)
})

///SEARCH USER WITH ID///
app.get('/messages/:id', function(req, res) {
  if(isNaN( req.params.id)){
    res.send({
        "message": "undefined message"
    })
  }else{
 const message = messages.find(u => u.id==req.params.id)
 if(message){
     res.send(message)
 }else{
     res.send(404, {
         "message" : "Data Did Not Find"
     })
 }
  }
});


///DELETE MESSAGE///
app.delete('/messages/:id', function(request, response) {
  let messageId = Number(request.params.id)
  let index = messages.findIndex(message=> message.id === messageId)
  let deleted = messages.splice(index, 1)
  response.json(messages);
});

///POST MESSAGES//
app.post('/messages', function(request, response) {
    let today = new Date()
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let time = today.getHours() + 1 + ":" + today.getMinutes() + ":" + today.getSeconds();
    let timeSend = date  + " " + time;
    let newMessage = {
    id: new Date().getTime(), // or messages.length
    from: request.body.from,
    text: request.body.text
     }
     if(newMessage.from && newMessage.text){
     messages.push(newMessage)
     } else {
      response.status(400).json('Add name and message')
    }
     response.json(messages);
    });
 
///PUT MESSAGES//UPDATE text or from Property with id
app.put('/messages/:id', function(request, response) {
    let messageId = Number(request.params.id)
    let selectMessage = messages.find(message => message.id == messageId)
    if(selectMessage){
   selectMessage.from = request.body.from
    selectMessage.text = request.body.text
    } else {
    response.status(400).json('Add a valid message id')
   }

      response.json(messages);
          });
///PATCH MESSAGES///UPDATE EVERY PROPERTY
app.patch("/messages/:id", (req,res) => {
    if(isNaN( req.params.id)){
        res.send(400,{
            "message": "undefined data"
        })
      }else{
     const message = messages.find(u => u.id==req.params.id)
     if(message){
        Object.keys(req.body).forEach(key => {
            message[key] = req.body[key]
        })
        res.send(message)
     }else{
         res.send({
             "message" : "Data Did Not Find"
         })
     }
      }
});
///LISTEN///
app.listen(process.env.PORT || 3009, ()=>{
  console.log("Server is working");
})
