const PORT = 3001;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const fs = require("fs");

app.use(cors());
app.use(morgan("dev"));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//helper functions
//get a convertet ti JSON data
function getConvertedDataFromJSON() {
  const bitedData = fs.readFileSync("./data.json");
  const dataAsObj = JSON.parse(bitedData);

  return dataAsObj;
}

function writeUpdateDatatoJsonFile(data) {
  const jsonFile = "./data.json";
  const dataAsJson = JSON.stringify(data);
  fs.writeFileSync(jsonFile, dataAsJson);
}

//get a index.html page
app.get("/", function (req, res) {
  console.log("Server is up");
  return res.status(200).send(getConvertedDataFromJSON());
});

//get all data
app.get("/messages", (req, res) => {
  console.log();
  res.status(200).send(getConvertedDataFromJSON());
});

//post a new obj to data.json
app.post("/messages", (req, res) => {
  const { from, text } = req.body;
  console.log(req.body);

  // Check if 'from' or 'text' properties are empty or missing
  // if (!from || !text) {
  //   return res
  //     .status(400)
  //     .json({ error: "Both 'from' and 'text' properties are required." });
  // }

  const dataAsObj = getConvertedDataFromJSON();

  dataAsObj.push({
    id: dataAsObj.length,
    createAt: new Date(),
    updatedAt: new Date(),
    from: from,
    text: text,
    // ...req.body
  });

  writeUpdateDatatoJsonFile(dataAsObj);
  return res.status(201).redirect("/");
});

//change spesific obj by ID
app.patch("/messages/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const newData = req.body;
  const dataAsJson = getConvertedDataFromJSON();

  Object.assign(dataAsJson[requestedID], newData);
  dataAsJson[requestedID].updatedAt = new Date();
  writeUpdateDatatoJsonFile(dataAsJson);

  return res.status.redirect("/");
});

//delete spesific obj by ID
app.delete("/messages/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const dataAsObj = getConvertedDataFromJSON();
  const indexOfObj = dataAsJson.findIndex((obj) => obj.id === requestedID);

  if (indexOfObj >= 0) {
    dataAsObj.splice(indexOfObj, 1);
    writeUpdateDatatoJsonFile(dataAsObj);

    return res.status(201).redirect("/");
  }
  if (indexOfObj < 0) {
    return res.status(404).redirect("/");
  }
});

//get a specific obj by ID
app.get("/messages/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const dataAsObj = getConvertedDataFromJSON();

  const dataByID = dataAsObj.find((element) => element.id === requestedID);

  if (!dataByID) {
    res.status(404).send(`Message with ID: ${requestedID} was not found`);
  }
  writeUpdateDatatoJsonFile(dataAsObj);
  res.status(200).redirect("/");
});

//get obj whose text contains a given substring: `/messages/search?text=express`
app.get("/messages/search", (req, res) => {
  const searchWord = req.query.input;
  const dataAsJson = getConvertedDataFromJSON();

  const matchedWithInput = dataAsJson.filter((element) =>
    element.text.toLowerCase().includes(searchWord)
  );
  if (!matchedWithInput) {
    return res
      .status(404)
      .send(`We can't find a message which contains: ${searchWord}`);
  }
  return res.status(200).send(matchedWithInput);
});

// app.get("messages/lates", (req, res) => {
//   for(let i = 10; i < )
// })

app.listen(process.env.PORT);
