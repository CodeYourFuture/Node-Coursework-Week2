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

app.delete("/people", (request, response) => {
res.send("DELETE Request Called");
});

const port = 3000;
app.listen(port, () => {
  console.log("listening on port " + port);
});
