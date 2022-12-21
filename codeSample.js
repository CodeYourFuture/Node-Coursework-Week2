/* 
We have a client requirement to build a RESTful API in Express
to manage a database of Harry Potter Characters.

This API should include:
- an endpoint that returns a list of all characters

- - this endpoint should have the ability to filter by house 
    and by name. 

- an endpoint that returns the details of a single character

/characters
/characters/<id>
/characters/1
/characters/2
/characters/3

/characters?name=Harry Potter&house=Gryffindor
/characters?house=Gryffindor
/characters?house=Slytherin


C - Create
  - POST request

R - Read/Retrieve
  - GET request

U - Update
  - PUT
    - Updating the entire document

  Original Document
  {
    "name": "Hannah Abbott",
    "house": "Hufflepuff"
  }
  
  Hannah Abbot changes house to Gryffindor

  PUT /characters/22
  Body:
    {
      "name": "Hannah Abbott",
      "house": "Gryffindor"
    }

  PATCH /characters/22

  Body:
    {
      "house": "Gryffindor"
    }


D - Delete
  - DELETE
  
  DELETE /characters/:id


POST /characters   

  Headers
    {
      "Authentication": <auth token>
    }

  Body: 
    {
      "name": "Hannah Abbott",
      "house": "Hufflepuff"
    }


// 200 OK 
// 400 Client Error (bad input/no auth/wrong auth)
// 500 Server Error (API broke)



*/

// import express
const express = require("express")
const fs = require("fs")

// create a new express api
const app = express()
app.use(express.json())

const port = 3000

//read in from the json file
let data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
let maxID = Math.max(...data.map(c => c.id))


// READ ENDPOINTS
app.get("/characters", (req, res) => {
    let characters = data

    if (req.query.name) {
        characters = characters.filter(c => c.name === req.query.name)
    }

    if (req.query.house) {
        characters = characters.filter(c => c.house === req.query.house)
    }

    res.json(characters)
})

app.get("/characters/:id", (req, res) => {
    const characterId = parseInt(req.params.id)
    res.json(data.find(c => c.id === characterId))
})

// END READ ENDPOINTS


// CREATE ENDPOINT
app.post("/characters", (req, res) => {
  // 1) validate our input
        // make sure house and name are present
        // make sure that house is a valid Hogwarts house
  if (!req.body.name || !req.body.house){   
    res.status(400).send("You must include a name and a house in your request")
    return
  } 
  const validHouses = ["Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff"]
  if (!validHouses.includes(req.body.house)) {
    res.status(400).send("House must be a valid Hogwarts House")
    return
  }
  
  // 2) format/build our new resource
  
  const newCharacter = {
    "id": ++maxID,
    "name": req.body.name,
    "house": req.body.house
  }

  // 3) save our new resource

  data.push(newCharacter)
  save()
  res.json(newCharacter)
})
// END CREATE ENDPOINT


app.delete("/characters/:id", (req, res) => {
  // 1) Validate your input
      // check the id is valid and that the resource exists

  const characterId = parseInt(req.params.id)
  const characterIndex = data.findIndex(c => c.id === characterId)

  if (characterIndex < 0){
    res.sendStatus(404)
    return
  }
  
  // 2) Delete the object
  //     save the data

  data.splice(characterIndex, 1)
  save()
  res.send("character deleted")
})


//PUT

app.put("/characters/:id", (req, res) => {
  //1) Validate your input
        // check the character exists 

  // check contents of body
  if (!req.body.name || !req.body.house){   
    res.status(400).send("You must include a name and a house in your request")
    return
  } 
  const validHouses = ["Gryffindor", "Ravenclaw", "Slytherin", "Hufflepuff"]
  if (!validHouses.includes(req.body.house)) {
    res.status(400).send("House must be a valid Hogwarts House")
    return
  }

  // check character resource exists
  const characterId = parseInt(req.params.id)
  const characterIndex = data.findIndex(c => c.id === characterId)

  if (characterIndex < 0){
    res.sendStatus(404)
    return
  }

  //2) Create an updated document
  const updatedCharacter = {
    "id": characterId,
    "name": req.body.name,
    "house": req.body.house
  }

  //3) Replace the old document with the new one
  const origCharacter = data[characterIndex]
  data[characterIndex] = updatedCharacter
  save()
  // send original and updated, so you can verify the change
  res.json([origCharacter, updatedCharacter])
})

/*
some general thoughts. 
break your request handlers into reusable functions for ease of
readability and testing. A sample update request handler might look like:
{
  validatebody(req.body.name, req.body.house)
  const charIndex = checkCharacterExists(req.params.id)
  if (charIndex<0){
    res.sendStatus(404)
  }
  const updatedChar = buildCharacter(req.body.name, req.body.house, req.params.id)
  update(updatedChar, charIndex)
}

testing hierarchy
// unit < integration < end2end

only small functions can be unit tested properly
*/

/*
  This is terrible code - never do this in production
  It will make your tech lead sad.
*/
const save = () => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})