const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();

app.use(cors());

//Body parser middleware (Form)
app.use(express.urlencoded({ extended: false }))


//Static Folder
app.use(express.static(path.join(__dirname, 'public')))


//Routes
app.use('/messages', require('./routes/messages'))


const listener = app.listen(process.env.PORT || 8080, () => { console.log("listening on", listener.address().port) });
