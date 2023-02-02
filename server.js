

const express = require("express");
const cors = require("cors");
const bodyParser=require('body-parser')

const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
let welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};


let welcomeMessage2 = {
  id: 1,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};
let messages = [welcomeMessage2,welcomeMessage];




// GET
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get('/messages',(req,res)=>{
  res.json({messages})
})
// POST
app.post('/messages',(req,res)=>{
  
  let from=req.body.from
  let text=req.body.text
  let newMessage={
    'id':messages.length,
    'from':from,
    'text':text,

  }
  if(!from || !text ){
    res.status(404).send('Complete the form')
  }else{ messages.push(newMessage)
    res.json({messages})}

})

app.delete("/messages", (res,req) => {
  console.log("DELETE Request Called for /deleteAll endpoint")
  res.send("DELETE Request Called");
  let id = req.params.id;
  messages.filter(message => {
   return message.id !== id;
  })
})

app.get("/messages/lastMessage",(req,res)=>{
  const lastMessage=messages[0]
  res.json(lastMessage)
})

app.get('/messages/:id',(req,res)=>{

  let inputId=+req.params.id
  let foundItem=messages.find(item=>item.id===inputId)
  if(foundItem){
    res.status(200).send(foundItem)
  }else{
    res.status(404).send('Nothing matched !')
  }

})

app.get('/messages/search',(req,res)=>{
  const searchedItem=messages.filter(item=>item.text.toLocaleLowerCase().includes(req.query.term.toLocaleLowerCase()))
  res.send(searchedItem)
})



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`Your server on ${PORT}  `)
  );