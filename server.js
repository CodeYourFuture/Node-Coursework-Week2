const port = 3001;

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

// helper functions

// get a convertet it JSON data
function getConvertedDataFromJSON() {
  const bytedData = fs.readFileSync("./data.json");
  const dataAsObj = JSON.parse(bytedData);
  return dataAsObj;
}

//
function writeUpdateDataToJsonFile(data) {
  const jsonFile = "./data.json";
  const dataAsJson = JSON.stringify(data);
  fs.writeFileSync(jsonFile, dataAsJson);
}

// get index.html page
app.get("/", function (req, res) {
  return res.status(200).send("index.html");
});

// get all data
app.get("/messages", (req, res) => {
  return res.status(200).send(getConvertedDataFromJSON());
});

// get obj whose text contains a given substring: `/messages/search?text=express`
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

// get a specific obj by ID
app.get("/messages/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const dataAsObj = getConvertedDataFromJSON();

  const dataByID = dataAsObj.find((element) => element.id === requestedID);

  if (!dataByID) {
    return res
      .status(404)
      .send(`Message with ID: ${requestedID} was not found`);
  }

  return res.status(200).send(dataByID);
});

// post a new obj to data.json
app.post("/messages", (req, res) => {
  const { from, text } = req.body;

  // Check if 'from' or 'text' properties are empty or missing
  if (!from && !text) {
    res
      .status(400)
      .json({ error: "Both 'from' and 'text' properties are required." });
  }

  const dataAsObj = getConvertedDataFromJSON();

  dataAsObj.push({
    id: dataAsObj.length,
    createAt: new Date(),
    updatedAt: new Date(),
    from: from,
    text: text,
    // ...req.body
  });

  writeUpdateDataToJsonFile(dataAsObj);

  return res.status(201).send(dataAsObj);
});

// change spesific obj by ID
app.patch("/messages/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const newData = req.body;
  const datAsObj = getConvertedDataFromJSON();

  Object.assign(datAsObj[requestedID], newData);
  datAsObj[requestedID].updatedAt = new Date();
  writeUpdateDataToJsonFile(datAsObj);

  return res.status().send(datAsObj);
});

// delete spesific obj by ID
app.delete("/messages/:id", (req, res) => {
  const requestedID = parseInt(req.params.id);
  const dataAsObj = getConvertedDataFromJSON();
  const indexOfObj = dataAsObj.findIndex((obj) => obj.id === requestedID);
  console.log(indexOfObj);

  if (indexOfObj >= 0) {
    const deletedMessage = dataAsObj[indexOfObj];
    dataAsObj.splice(indexOfObj, 1);
    writeUpdateDataToJsonFile(dataAsObj);
    return res.status(201).send(deletedMessage);
  }

  if (indexOfObj < 0) {
    return res
      .status(404)
      .json({ error: `Message with id ${requestedID} does not exist` });
  }
});

app.listen(port, () => {
  console.log(`Server listening on Port ${port}`);
});
