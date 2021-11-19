const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({ extended: true }));

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
  //console.log(messages);
});

app.get("/messages", function (request, response) {
  // const newMassage = request.body
  response.send(messages);
  //TODO:...

  //request.send(newMassage.name)
});

app.get("/messages/search", function (request, response) {
   const newMassage = request.query.text;
   console.log(newMassage);
   const matchQueryMsg = messages.filter(msg =>{
     return msg.text.toLowerCase().includes( newMassage.toLowerCase());
  });

//console.log(matchQueryMsg + ".........>>>>>>>>");
  response.send(matchQueryMsg);
});

app.get("/messages/latest",(req, res)=>{
  res.send(messages.slice(-10));
})

app.get("/messages/:id", function (request, response) {
  const filteedID = request.params.id;
  const result = messages.find((mes) => mes.id === Number(filteedID));
  //console.log(request.params.id);

  // console.log(messages)
  // console.log(typeof filteedID)
  response.json(result);
});

app.delete("/messages/:id", function (request, response) {
  const filteredID = request.params.id;
  const result = messages.find((mes) => mes.id === Number(filteredID));
  let remainedMs = messages.filter((msg) => {
    return msg.id !== Number(filteredID);
  });

  messages = remainedMs;
  //console.log(messages);

  response.json(messages);
});

app.post("/messages", function (request, response) {
  let id = messages.length;
  console.log(request.body);
   console.log(request.body.text);

  if (
    request.body === null ||
    request.body.text == " " ||
    request.body.text == "" ||
    request.body.text === null ||
    request.body.from === " " ||
    request.body.from == "" ||
    request.body.from === null
  ) {
    response.status(400).send("not valid request");
  } else {
    const newMassage = {
      id: id,
      from: request.body.from,
      text: request.body.text,
    };
    // console.log(newMassage );

    messages.push(newMassage);
    // console.log( messages);
    response.json(messages);
  }
});



const PORT= process.env.PORT || 3000;

app.listen(PORT, ()=>{
  console.log("the server is running");

});
