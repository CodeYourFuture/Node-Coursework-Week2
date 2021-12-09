const express = require("express");
const cors = require("cors");
var bodyParser = require('body-parser');
const app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cors());

const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
  timeSent: new Date(),
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

app.get("/messages", function (request, response) {
  response.json(messages); 
});


app.get("/messages/:search", function(request, response){
  console.log("/messages/:id run");
  // console.log(request.query.text)
  console.log(request.params.search);

  if (messages[request.params.search] != undefined){
    response.json(messages[request.params.search]); 
  
  } else if (request.query.text != undefined) {
    const searchTerm = request.query.text.toLowerCase();

    const returnedList = messages.filter((element,index) =>{
      //  console.log(element);
      // console.log(element.text.includes(searchTerm));
      const lowerElement = element.text.toLowerCase();
      if (index < 10){
        return lowerElement.includes(searchTerm)
      }
    });
    console.log(returnedList);
    response.json(returnedList); 
  }
});


// Remember to use POSTMAN for sending requests - much easier than browser. And can change 
// type of request including to a DELETE request.....
app.delete("/messages/:id", function(request, response){
  console.log("DELETE run")
  console.log(request.params.id)

  const index = messages[request.params.id];
  console.log(index);

  if (index.id > -1) {
    messages.splice(index.id, 1);
  }
  response.json(messages); 


});

app.post("/messages", urlencodedParser,  function(req, res){
  console.log("LOOK BELOW !!!!!!!!!!!")
  console.log(req.body.from);
  console.log(req.body.text)
  
  if ((req.body.from.length > 0)&&(req.body.text.length > 0)){
    const newMessage = {
      "id":messages.length,
      "from": req.body.from,
      "text":req.body.text,
      "timeSent" : new Date()
    }
    messages.push(newMessage); 
    console.log(messages);
  } else {
    return res.status(400).send({
      message: 'Error - The Name or Message fields are empty!' 
    });
  } 

});






// To get the server to start I needed to declare the port rather than using the code commented out.
// app.listen(process.env.PORT);
const PORT = 3010;
app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});
