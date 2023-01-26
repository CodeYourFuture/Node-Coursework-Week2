const express = require("express");
const cors = require("cors");
const { urlencoded } = require("express");
const bodyParser=require('body-parser')

const app = express();

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
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

app.get('/messages',(req,res)=>{
  res.json({messages})
})

app.post('/messages',(req,res)=>{
  
  let from=(req.body.from)
  let text=req.body.text
  let arrayone=[]
  for(let item of messages){
      arrayone.push(item.id)
  }
  let newmessage={
    'id':Math.max(...arrayone)+1,
    'from':from,
    'text':text,
    'time-sent':new Date()
  }
  if(!from || !text ){
    res.status(404).send('It is not compeleted')
  }else{ messages.push(newmessage)
    res.json({messages})}

})
app.get("/messages/latest",(req,res)=>{
  
  // const filterd=messages.slice(Math.max(messages.length - 5, 1))
  const filterd=messages.slice(-1)
  res.json(filterd)
})

app.get('/messages/:id',(req,res)=>{

  let inputid=+req.params.id
  let foundItem=messages.find(item=>item.id===inputid)
  if(foundItem){
    res.status(200).send(foundItem)
  }else{
    res.status(404).send('Error')
  }

})


app.delete('/messages/:id',(req,res)=>{
  let inputedid=+req.params.id
  let filtered=messages.filter(item=>item.id!==inputedid)
  if(filtered){
    res.status(200).send(filtered)
  }else{
    res.status(404).send('Error')
  }
})
app.get('/messages/search',(req,res)=>{
  const filteredbasedonsearch=messages.filter(item=>item.text.toLocaleLowerCase().includes(req.query.term.toLocaleLowerCase()))
  res.send(filteredbasedonsearch)
})




app.listen(process.env.PORT||8000,(req,res)=>console.log('The Server is listening')
  );
