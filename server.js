const express = require("express");
const cors = require("cors");

const app = express();

//app.use(JSON());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// const welcomeMessage = {
//   id: 0,
//   from: "Bart",
//   text: "Welcome to CYF chat system!",
// };

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
//const messages = [welcomeMessage];

//Messages Api Routes
app.use("/api/messages", require("./routes/api/messages"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
