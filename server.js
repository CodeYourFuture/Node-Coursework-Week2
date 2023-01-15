const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json())
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
   
// localhost:9090/messages/search?text=khubi
http: app.get("/messages/search", (req, res) => {
  const searchKeyword = req.query.text;
  if (searchKeyword) {
    const matched = messages.filter((message) =>
      message.text.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    res.send(matched);
  }
});

app.get("/messages/latest", (req, res) => {
  res.send(messages.slice(-10));
});


app.get("/messages", function(req,res){
  res.send({messages})
}
)
app.get("/messages/:id", function(req,res){
  const messagesId = +req.params.id;
  const oneMessage= messages.find((item)=>item.id===messagesId)
  res.send({oneMessage}); 
})

app.post("/messages", (req, res) => {
  const newMsg = req.body;
  const valid =
    !!newMsg.text &&
    !!newMsg.from &&
    newMsg.hasOwnProperty("text") &&
    newMsg.hasOwnProperty("from");
  if (!valid) {
    res.status(400).send("missing information");
  } else {
    newMsg.id = messages.length
    messages.push(newMsg);
    console.log(messages);
  }
});


app.delete("/message/:id" , (req, res)=>{
  const messageID =+ req.params.id
  messages=messages.filter(item=> item.id!==messageID)
  res.send({messages});
})



app.listen(9090);
