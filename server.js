const express = require("express");
const cors = require('cors');
const { request } = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(cors())

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: req.body.timeSent 
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.


//Read all messages
const messages = [welcomeMessage]
app.get('/messages',(req,res)=>{
  res.send(messages)
})

//Read message by id
app.get('/messages/:id',(req,res)=>{
  const id=req.params.id;
  const found = messages.find(e=>e.id == id)
  found ? res.json (found) : res.sendStatus (404);
  res.json(found)
})

// Post new messages with time stamps
app.post('/messages',(req,res)=>{
  
   if(req.body.from || req.body.text){
  messages.id = messages.length

  const newMessage = req.body
  newMessage.id=messages.length
     req.body.id = newMessage.id;
      req.body.timeSent = new Date ();
      messages.push (req.body);
      res
        .status (201)
        .json (` Successfully A new chat with Id number ${newMessage.id}  is created.`);
 
   }
  else{
    res.status(400).send("Bad Request")
  }     
     });

    // Delete message by ID
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
//Message Search
    app.get ('/messages/search', (req, res) => {
      const searchMessage = req.query.text;
      const result = messages.filter (e => {
       return e.text.toLowerCase ().includes (searchMessage.toLowerCase ());
      });
      console.log (result);
      if (result) {
        res.json (result);
      } else {
        res.sendStatus (404);
          }
        });

  



app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});






app.listen(process.env.PORT);
