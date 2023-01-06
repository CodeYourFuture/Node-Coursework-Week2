const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))

const welcomeMessage = {
  id: 0,
  from: 'Bart',
  text: 'Welcome to CYF chat system!',
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]
console.log(messages)
// let nextId =
//   1 +
//   messages.reduce(
//     (n, message) => (n < messages.message ? messages.message : n),
//     0
//   )

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
  //response.json(messages)
})

app.get('/messages', (request, response) => {
  response.json(messages)
})

app.get(`/messages/:id`, (request, response) => {
  //create a variable to store id in, parseInt
  //if no var response.status(404).send('message)
  //otherwise response.send(variable finding id)
  console.log(request.params.albumId)

  let req = request.params.id
  let validator = messages.find((id) => messages.id === req)

  if (!validator) {
    response.status(404).send('Not Found')
  }

  response.json(validator)
})

app.post('/messages', (request, response) => {
  const newMessage = req.body

  messages.push(newMessage)
  response.json(messages)
})

app.delete(`/messages/:id`, (request, response) => {
  console.log(response)
})

app.listen(3000)
//app.listen(process.env.PORT)
