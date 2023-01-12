const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))

const welcomeMessage = {
  id: 1,
  from: 'Bart',
  text: 'Welcome to CYF chat system!',
}

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage]

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
  response.json(messages)
})

app.get('/messages', (request, response) => {
  response.json(messages)
})

app.get(`/messages/:id`, (request, response) => {
  let req = request.params.id
  let validator =
    messages.find((id) => messages[id] === req)(validator === undefined) &&
    response.status(404).send('Not Found')

  response.json(validator)
})

app.post('/messages', (request, response) => {
  const newMessage = request.body
  console.log(request.body)
  newMessage.id = messages.length + 1
  messages.push(newMessage)
  response.json(messages)
})

app.delete(`/messages/:id`, (request, response) => {
  console.log(response)
  const req = request.params.id
  let validator =
    messages.find((id) => messages[id] === req)(validator === undefined) &&
    response.status(404).send('Not Found')

  const msgIndex = messages.findIndex((ind) => ind === messages.req)
  messages.splice(msgIndex, 1)
  response.send('Message deleted')
})

//app.listen(3000)
app.listen(process.env.PORT)
