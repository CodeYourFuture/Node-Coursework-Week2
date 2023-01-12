const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const app = express();


const bodyParser = require("body-parser")
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use(cors());


const welcomeMessage = {
  id: 0,
  from: "Neill",
  text:"hi hi"
};
//This array is our "data store".
//oneWe will start with  message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages",(request,response)=>{
  response.status(200).json({messages})
})

app.get("/messages/:id",(request,response)=>{
  const id= Number(request.params.id);
  const find= messages.find(message=>message.id===id);
  response.status(200).json({find})
})

app.post("/messages",(request,response)=>{
   if(request.body.from==="" || request.body.text==="" ){
    response.status(400).json({message : "fill all fields"});
    return;
  }
      const newMessage= {
    id :messages.length,
    from : request.body.from, 
    text : request.body.text
  };
  messages.push(newMessage);
  response.status(201).json({newMessage});
})
app.delete("/messages/:id",(request,response)=>{
  const messageById=messages.find((message)=>message.id===Number(request.params.id));
  if(messageById<0) return response.status(404).json({msg : "message not found"});
  messages.splice(messageById,1);
  response.json({messages})
})
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}.Ready to accept request!`);
});