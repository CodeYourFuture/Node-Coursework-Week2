const express = require('express');
const app = express();  
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Messages route
app.use('/messages', require('./routes/messages/messages'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`The server is listening on PORT ${port}`);
});
