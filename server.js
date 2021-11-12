const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req,res)=>{
  res.send(messages);
  console.log("massage has send");
})

app.get("/messages/latest", (req, res) => {

  res.send(messages.slice(-10));
  
});

app.get("/messages/search", (request, response) => {
 const searchText = request.query.text;

  const filterMessage = messages.filter(
    (message) => message.text.toLowerCase().includes(searchText.toLowerCase()) 
  );

  if(filterMessage.length === 0){
    response.status(404).send("nothing there!!!");
    return;
  }

  response.send(filterMessage);
});

app.post("/messages",(req,res)=>{
  const newMessage = req.body;

  if(!newMessage.text || !newMessage.from){
   res.status(404).send("Please fill the text");
   return;
  }

  const newObj = {
    id: messages[messages.length -1].id + 1,
    from: newMessage.from,
    text: newMessage.text,
  };
  console.log(newMessage);

  if(newMessage){
   messages.push(newObj);
   res.status(201).send(newObj);
  }else{
    res.status(400).send("error");
  }
  
  
})

app.get("/messages/:messageId", (request, response) => {
  const filterMessage = messages.filter(
    (message) => message.id === +request.params.messageId
  );
  response.send(filterMessage);
});

app.delete("/messages/:messageId", (request, respond) => {
  const index = messages.findIndex(
    (message) => message.id === +request.params.messageId
  );
  //console.log(index);
  messages.splice(index, 1);

  respond.send("delete was successful");
  console.log("DELETE /album route");
});

app.listen(PORT, ()=>console.log(`server run in ${PORT}`));
