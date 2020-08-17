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
  {
    id: 6,
    from: "James",
    text: "Hello",
    timeSent: dateTime,
  },
  {
    id: 7,
    from: "Helen",
    text: "Hope everyonen is doing well",
    timeSent: dateTime,
  },
  {
    id: 8,
    from: "Qasim",
    text: "I am excited and pleased to be part of CYF chat group",
    timeSent: dateTime,
  },
  {
    id: 9,
    from: "Jasmin",
    text: "Exciting times",
    timeSent: dateTime,
  },
  {
    id: 10,
    from: "Shahad",
    text: "Pleased to be here too",
    timeSent: dateTime,
  },
  {
    id: 11,
    from: "Ahmad",
    text: "Thanks you for the opportunity",
    timeSent: dateTime,
  },
  {
    id: 12,
    from: "Hamad",
    text: "Hi",
    timeSent: dateTime,
  },
];
module.exports = messages;
