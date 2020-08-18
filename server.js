const express = require("express");
const cors = require("cors");
const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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

app.post("/messages", (req, res)=>{
  
  let newPost ={
    id:messages.length +1 ,
    from: req.body.from,
    text: req.body.text
  }
  
  messages.push(newPost)
  res.json(messages)
})


//read  messages

app.get("/messages", (req, res) => {
 res.json(messages);
});

const listener = app.listen(process.env.PORT || 3005, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
