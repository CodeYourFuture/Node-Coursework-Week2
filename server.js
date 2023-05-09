const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
}; */
/* const { sampleCustomerData } = require("./controllers/chatControllers"); */

//const messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

/* app.get("/messagedata", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(sampleCustomerData);
}); */

//let people = ["Jason"];
/* 
app.get("/people", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(people);
});
 */
/* app.put("/people", (request, response) => {
  people.push(...request.body);
  response.json(people);
}); */
// messages route //
app.use("/messages", require("./route/route"));

app.listen(3000, () => {
  console.log("listening on port 3000");
});
