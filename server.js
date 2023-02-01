const express = require("express");
const cors = require("cors");
const { request } = require("express");
const port = process.env.PORT || 3001;
const app = express();
const fs = require("fs");

let data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

const save = () => {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
};

app.use(cors());

app.use(express.json());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// app.get("/", function (request, response) {
//   response.json(welcomeMessage).sendFile(__dirname + "/index.html");
// });

app.get("/", (req, res) => {
  res.json({ message: "Server is listening" });
});

app.get("/messages", (req, res) => {
  res.json(data);
});

app.get("/messages/latest", (req,res)=>{
  res.json(data.slice(Math.max(data.length - 10, 0)));
})

app.get("/messages/search/:key", (req,res)=>{
  let searchTerm = req.params.key;
  let foundMessages = data.filter( item=>item.text.includes(searchTerm)
  )

  res.json(foundMessages)

  //res.send(req.params.key)

})


app.post("/messages", (req, res) => {
  let newId = Math.max(...data.map((message) => message.id)) + 1;
  let newMessage = { id: newId, from: req.body.from, text: req.body.text };
  if(!newMessage.from || !newMessage.text){
    res.send(400)
    return
  }
  data.push(newMessage);
  save();
  res.json(newMessage);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
