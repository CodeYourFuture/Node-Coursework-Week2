const express = require("express");

const app = express();
app.use(express.json());

let people = ["Jason"];

app.get("/people", (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.json(people);
});

app.put("/people", (request, response) => {
  people.push(...request.body);
  response.json(people);
});


app.delete("/people/:name", (request, response) => {
  const nameToDelete = request.params.name;
  const indexToDelete = people.findIndex((name) => name === nameToDelete);
  if (indexToDelete === -1) {
    response.status(404).send("Person not found");
  } else {
    people.splice(indexToDelete, 1);
    response.send("Person deleted");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
