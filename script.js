const nameId = document.getElementById("name-id");
const messageId = document.getElementById("message-id");
let formFrom = "";
let formText = "";

console.log(messageId.value)

const sendMessage = (e) => {
    e.preventDefault();
    console.log("you've clicked me")
    console.log(formFrom);
    console.log(formText);

fetch("http://localhost:4000/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ from: formFrom, text: formText })
});
}

const sendButton = document.getElementById("send-id");

sendButton.addEventListener("click", sendMessage)

nameId.addEventListener("keyup", (e) => formFrom = e.target.value);
messageId.addEventListener("keyup", (e) => formText = e.target.value);