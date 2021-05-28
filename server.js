const express = require("express");
const cors = require('cors')
const messages = require("./Messages");
const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}));



  let counter = 1;
//This array is our "data store".
//We will start with one message in the array.
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get('/messages', function(request, response) {
  response.send(messages);
});



// create new post
app.post("/messages", (request, response) => {
    const newPost = {
     id: counter,
      //id: uuid.v4(),
      from: request.body.from,
      text: request.body.text,
      timeSent: new Date(),
    }
      counter++

    if(!request.body.from || !request.body.text){
     // response.status(400).json({msg:"please include name and message"});
      response.send("required fields must not ber empty!!!");
    }  else {
      messages.push(newPost);    
      //response.status(201);
      response.send(messages); 
    }      
});



//Read only messages whose text contains a given substring:
app.get("/messages/search",  (request, response)=> {
  let text = request.query.text.toLowerCase();
  let result = searchResult(messages, text);
  response.send(result);
});

// filter's the searchn term
const  searchResult = (messages, param) =>{
      const filtered =  messages.filter( item => {
      const {from,text}= item;
      return from.toLowerCase().includes(param) || text.toLowerCase().includes(param);
      });     
    return filtered;
  }


//Read only the most recent 10 messages
app.get("/messages/latest", function (request, response) {
 response.json(messages.slice(messages.length - 10));
 
});

//read messages according to the message ID
app.get("/messages/:id", (req, res) => {
    const found = messages.some(message => message.id === parseInt(req.params.id));
    if(found){
      res.json(messages.filter(message => message.id === parseInt(req.params.id))); 
    }else{
      res.status(400).json({msg: `connt't Find id of ${req.params.id}`}); 
    }

});


// update the messages
app.put("/messages/:id", (req, res) => {
    const found = messages.some(message => message.id === parseInt(req.params.id));
    if(found){
      const updateMessage = req.body;

      messages.forEach(item =>{
          if(item.id === parseInt(req.params.id)){
            item.from = updateMessage.from ? updateMessage.from : item.from;
            item.text = updateMessage.text ? updateMessage.text : item.text;
            res.json({msg:"message updated" , item})
          }
      });
    }else{
      res.status(400).json({msg: `Item Found with id of ${req.params.id}`}); 
    }

});

//Delete Message
app.delete("/messages/:id", (req, res) => {
  const found = messages.some(message => message.id === parseInt(req.params.id));
  if(found){
    res.json({msg:"Message was deleted" , messages: messages.filter(message => message.id !== parseInt(req.params.id))}); 
  }else{
    res.status(400).json({msg: `No Message Found with id of ${req.params.id}`}); 
  }

});





  const PORT = process.env.PORT || 3001;
  const listener = app.listen(PORT, function () {
  console.log("Server running on Port " + listener.address().port);
});


