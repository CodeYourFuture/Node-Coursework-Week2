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
    res.status(400).send(`You must include  name and message in your request`)
    return
  } 
  else{
    // res.send(req.body)
    const newMessage = {
      "id": ++maxID,
      "from": req.body.from,
      "text": req.body.text,
      "date": new Date()
    }
    messages.push(newMessage)
      res.send(`<h1>The message has been added</h1> <button onclick="history.back()"> Go Back </button> `)
    
  }

});

//Show or read al messages
app.get('/messages', (req,res)=>{
  res.send(messages)
} )


//Read or show on message by id
app.get('/message', (req,res)=>{
  const found=messages.filter(message => message.id===parseInt(req.query.id))
  if(found.length>0){
    res.send(found)
    }

else{
 res.status(400).json({msg: `no message with the id of ${req.query.id}`})
}
  
} )


//Delete a message by id
app.delete('/message/:id', (req,res)=>{
   const index=messages.findIndex(message => message.id===parseInt(req.params.id))


  if(index>=0){
   messages.splice(index,1)
    }
else{
 res.status(400).json({msg: `There is no an element with the id ${req.params.id}`})
}
  
} )

//Show only messages contains spefic text
app.get('/messages/search', (req, res) => {
  const selectedMessages=messages.filter(elm => elm.text.includes(req.query.text))
  if (selectedMessages.length == 0){   
    res.status(400).send(`There is no message that includes this text`)
  } 
  else{
    // res.send(req.body)
    res.send (selectedMessages)
    }

});

//Show only latest 10 messages 
app.get('/messages/latest', (req, res) => {
  const latest10Messages=messages.slice(messages.length-10, messages.length)
  // const currentDate=new Date()


  // console.log(currentDate)
    // res.send(req.body)
    res.send (latest10Messages)

});

// app.listen(process.env.PORT);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT} `));