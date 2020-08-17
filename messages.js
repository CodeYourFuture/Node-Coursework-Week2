const today = new Date();
const minutes = String(today.getMinutes()).padStart(2, "0");
const seconds = String(today.getSeconds()).padStart(2, "0");
const time = today.getHours() + ":" + minutes + ":" + seconds;
const dd = String(today.getDate()).padStart(2, "0");
const mm = String(today.getMonth() + 1).padStart(2, "0"); // Jan = 0
const yyyy = today.getFullYear();
const date = dd + "/" + mm + "/" + yyyy;
const dateTime = time + " " + date;

const messages = [
  {
    id: 0,
    from: "Bart",
    text: "Welcome to CYF chat system!",
    timeSent: dateTime,
  },
  {
    id: 1,
    from: "Sarah",
    text: "Hi",
    timeSent: dateTime,
  },
  {
    id: 2,
    from: "Noor",
    text: "Morning",
    timeSent: dateTime,
  },
  {
    id: 3,
    from: "Nasra",
    text: "Morning everyone",
    timeSent: dateTime,
  },
  {
    id: 4,
    from: "Hasan",
    text: "Good morning all",
    timeSent: dateTime,
  },
  {
    id: 5,
    from: "Sally",
    text: "Hi, happy to be part of this chat group",
    timeSent: dateTime,
  },
];
module.exports = messages;
