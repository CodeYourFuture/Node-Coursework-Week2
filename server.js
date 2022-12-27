const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({
        origin: 'http://localhost:3000',
    }
));


app.use(bodyParser.urlencoded({ extended: true }));

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  // timeSent:"18/05/1985"
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage]


// level3 [5] read only text whose text contains a given substring
// teniolao-cyf-chat-server.glitGlitchch.me/messages/search?text=express
app.get("/messages/search", (req, res)=> {
  const { term } = req.query
  console.log(term)
  
  const filterMessages = messages.filter(message => message.text.toLowerCase().includes(term.toLowerCase()))
  console.log(filterMessages)
  res.send(filterMessages);
});

//[2] read all messages
app.get("/messages", (req, res) => {
  res.json(messages);
});
//  Read only the most recent 10 messages:

app.get("/messages/latest",(req,res)=>{
  res.send(messages.slice(-10))
})

//[3] read one message specified by id
app.get("/messages/:id", function (req, res) {
  const id = req.params.id;
  messages = messages.filter(
    (message) => message.id === Number(id)
  );
    res.status(200).json(messages);
});

app.get("/messages/search",(req,res)=>{
  let search=req.query.term
  let searchResult=messages.filter(
    mes=>mes.text.toLowerCase().includes(search.toLowerCase())
  )
  res.send(searchResult)
})

// [1] create a new message

app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  // console.log(req.body)
  const ourMessageObject = {
    id: messages.length+1 ,
    from,
    text,
    timeSent: new Date().toLocaleDateString()
  }

  if(from.length === 0 || text.length === 0){
    return res.status(400).send("please complete body")
  } else {
     messages.push(ourMessageObject);
  }
});

//[4] delete a message by id
app.delete("/messages/:id", (req, res) => {
  const id = req.params.id;
  messages = messages.filter((message) => message.id !== Number(id));
  res.send("message deleted")
});

app.put("/messages/:id",(req,res)=>{
  const id=req.params.id 
 let msg = messages.filter((message) => message.id===Number(id))
  if(msg.length>0){
    msg.from=req.body.from
    msg.text=req.body.text 
    res.send(msg)
  }else{
    res.send("not found")
  }
})


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.listen(3001, () => {
  console.log("server running!");
});