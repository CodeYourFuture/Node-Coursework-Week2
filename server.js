/* eslint-disable max-len */
const express = require('express');
// const cors = require('cors');
// input validation and sanitisation
const { body, validationResult } = require('express-validator');

const app = express();

// app.use(cors());
// app.use(express.json());
// TO BE ABLE TO ACCESS FORM VALUES
app.use(express.urlencoded({ extended: false }));

const welcomeMessage = {
  id: 0,
  from: 'Bart',
  text: 'Welcome to CYF chat system!',
};

// This array is our "data store".
// We will start with one message in the array.
// Note: messages will be lost when Glitch restarts our server.
const messages = [welcomeMessage];

// GET HOME PAGE
app.get('/', (request, response) => {
  console.log('Get Request was made...');
  console.log(__dirname);
  response.sendFile(`${__dirname}/index.html`);
});

// GET ALL MESSAGES
app.get('/messages', (req, res) => {
  console.log('GET request was made to route /messages');
  res.json(messages);
});

// GET MESSAGE BY ID
app.get('/messages/:id', (req, res) => {
  try {
    const id = Number(req.params.id);
    const message = messages.filter((msg) => msg.id === id);
    if (message.length < 1) {
      throw new Error(`Couldn't find message by id ${id}`);
    } else {
      res.json(message);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST NEW MESSAGE
app.post('/messages', 

  // sanitise and validate (has length, html escaped)
  body('from', 'Empty Name').trim().isLength({min: 1}).escape(),
  body('text', 'Empty Message').trim().isLength({min: 1}).escape(), 

  // controller
  (req, res) => {

      console.log('POST request was made to route /messages');
      const { from, text } = req.body;
      const id = messages.length;
      
      // check whether form input data passes validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      messages.push({id, from, text});
      res.json(messages);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
