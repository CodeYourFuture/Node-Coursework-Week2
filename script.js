const form=document.getElementById("message-form");
const messageContainer= document.getElementById("message-containre")
const latestMessageContainer= document.getElementById("latest-message-containre")
const nameId = document.getElementById("name-id");
const messageId = document.getElementById("message-id");
let formFrom = "";
let formText = "";

const fetchMessages = async() => {
    const response = await fetch("http://localhost:3000/messages");
    const data= await response.json();

    console.log(data)

    messageContainer.innerHTML=""

    data.forEach(message => {
        const textMessage=document.createElement("p");
        const fromMessage=document.createElement("h5");
        const deleteButton=document.createElement("button");
        const editButton=document.createElement("button")
        
        textMessage.innerHTML=`${message.text}`;
        fromMessage.innerHTML=`${message.from}`;
        deleteButton.innerText='Delete'
        editButton.innerText='Edit'
        messageContainer.appendChild(textMessage);
        messageContainer.appendChild(fromMessage);
        messageContainer.appendChild(deleteButton);
        messageContainer.appendChild(editButton);
    });
}

const fetchLatestMessages = async() => {
  const response = await fetch("http://localhost:3000/messages/latest");
  const latestData= await response.json();

  console.log(latestData)

  latestMessageContainer.innerHTML=""

  latestData.data.forEach(message => {
      const textMessage=document.createElement("p");
      const fromMessage=document.createElement("h5");
      const deleteButton=document.createElement("button");
      const editButton=document.createElement("button")
      
      textMessage.innerHTML=`${message.text}`;
      fromMessage.innerHTML=`${message.from}`;
      deleteButton.innerText='Delete'
      editButton.innerText='Edit'
      latestMessageContainer.appendChild(textMessage);
      latestMessageContainer.appendChild(fromMessage);
      latestMessageContainer.appendChild(deleteButton);
      latestMessageContainer.appendChild(editButton);
  });
}

const sendMessage = async(event) => {
    fetchMessages()
    event.preventDefault();

 fetch("http://localhost:3000/messages", {
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



////latest messages

const latestButton=document.getElementById("latest-button");
latestButton.addEventListener("click",fetchLatestMessages)