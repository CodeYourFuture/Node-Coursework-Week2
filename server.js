

const express = require("express");
const cors = require("cors");
const bodyParser=require('body-parser');
const { json } = require("express");

const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
let welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};



let messages = [welcomeMessage];




// implement HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// GET
app.get('/messages',(req,res)=>{
  
  res.json({messages})
  
})
// POST
app.post('/messages',(req,res)=>{
  
  // console.log(req.body)
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
// PUT

app.put("/messages/:id", (req,res) => {
  let selectedId = req.params.id;
  messages[selectedId] = req.body
  if(req.params.id){
    res.status(200).send(messages);
    console.log("your changing request received !")
    // console.log(req.params) the object which only includes parametre (id) you entered
    // console.log(req.body)  the object which includes all keys and values entered on postman
    // console.log(messages)  the array which includes all inputs
  }else return res.status(404).send("noothing matched")
})
// DELETE
app.delete("/messages/:id", (req,res) => {
  console.log("DELETE Request Called")
  let id = +req.params.id;

  messages = messages.filter(message =>  message.id !== id)
  
  console.log(id)
  res.status(200).send("your selected id has deleted")
  
  
})
// LAST MESSAGE
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