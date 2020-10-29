const express = require("express");
const cors = require('cors');
const { request } = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!"
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]
app.get('/messages',(req,res)=>{
  res.send(messages)
})
app.get('/messages/:id',(req,res)=>{
  const id=req.params.id;
  const found = messages.find(e=>e.id == id)
  // if(found){
  res.json(found)
})
app.post('/messages',(req,res)=>{
  
   if(req.body.from || req.body.text){
  messages.id = messages.length

  const newMessage = req.body
  newMessage.id=messages.length
  console.log(newMessage)
   messages.push(newMessage);
     res.json(messages)
   }
  else{
    res.status(400).send("Bad Request")
  }     
    });
    app.post("/message", (req,res)=>{
        const id = req.body.id;

        let arr = []
        const index = messages.findIndex(e=>e.id==id)

        if(index > -1){
            messages.splice(index,1)
            res.json('Delete successful')
        }
        else{
            res.status(400).json({msg:`could not find message with ${id}`})
        }
        res.send(arr)

    })
  
  



app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});






app.listen(process.env.PORT);
