const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json())

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

app.post('/new/:id/:name/:text', (req, res)=>{
  let id = req.params.id;
  let name = req.params.name;
  let text = req.params.text;
  console.log(req.body.messages = JSON.stringify(id, name, text));
  res.sendStatus(200);
});

app.get('/getAll', (req, res) => res.send(messages.JSON));

app.post('/post', (req, res)=>{
  console.log(req.body.messages)
  console.log(`These are all my messages before pushing : ${messages.length}`);
  messages.push(req.body.messages.JSON.toString);
  console.log(`These are all my messages after pushing : ${messages.length}`);
  res.sendStatus(200);
});

app.get('/message/:id', (req, res) => {
  const id = req.params.id;
  let filteredMessage = messages.filter(item => item.id ==! id);
  console.log(filteredMessage.length);
res.sendStatus(400).json.toString({success: true});
});

app.delete('/delete/:id', (req, res) =>{
  console.log('Delete/delete route');
  const paramsId = req.params.id;
  let messageFiltered = messages.filter(item => item.id == paramsId);
  console.log(messageFiltered);
  res.sendStatus(200).json.toString({success: true});
  })


app.listen(3001);

// app.post('/index/:message', (req, res)=>{
//   let id = req.params.id;
//   let filteredMessage = messages.filter(mess => mess.id == id);
//   res.send(filteredMessage ==! id || "" ? res.sendStatus(400) : console.log(req.body) );
// });
