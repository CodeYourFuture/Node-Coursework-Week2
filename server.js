const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const welcomeMessage = {
  id: 0,
  from: 'Bart',
  text: 'Welcome to CYF chat system!',
}

let messages = [welcomeMessage]

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/messages', (req, res, next) => {
  res.send(messages)
})
app.get('/messages/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  const message = messages.find((message) => message.id === id)
  if (!message) return res.status(404).send('Message not found!')
  res.json(message)
})

app.post('/messages', (req, res) => {
  const newId = Math.max(...messages.map((m) => m.id)) + 1
  const newMessage = {
    id: newId,
    from: req.body.from,
    text: req.body.text,
  }
  messages.push(newMessage)

  res.sendStatus(201)
})

app.delete('/messages/:id', function (req, res) {
  const id = req.params.id
  const found = messages.some((message) => message.id == id)
  if (found) {
    messages = messages.filter((message) => message.id != id)
    res.status(200).json('Message deleted!')
  } else res.status(400).json('Message not found!')
})

app.listen(port, () => {
  console.log(`Server starting on port ${port}`)
})
