const express = require("express");
const router = express.Router();
const uuid = require("uuid"); 
const messages = require("../Messages");
const lodash = require('lodash'); 
const faker = require('faker');

//  level 3 
// search route
router.get("/messages/search",(req,res) => {
    let text = req.query.text;
    const found = messages.some(message => message.text.toLocaleLowerCase().includes(text));
    if(found){
        res.json(messages.filter(message => message.text.toLocaleLowerCase().includes(text)))
    }else{
            res.status(400).json({ msg: `No message with the text of ${text}`});
    }
})

//  last 10 messages
router.get("/messages/latest",(req,res) => {
    res.json(lodash.takeRight(messages,10))
})

// get all messages
router.get("/messages",(req,res) => {
    res.json(messages);
})

// get message with id
router.get("/messages/:id", (req,res) => {
    const found = messages.some(message => message.id === parseInt(req.params.id));
    if(found){
        res.json(messages.filter(message =>  message.id === parseInt(req.params.id)))
    }else {
        res.status(400).json({ msg: `No message with the id of ${req.params.id}`});
    } 
})

// create Messages
router.post("/messages", (req, res) => {
    const num = uuid.v4()
    const newMessages = {
        id: typeof  num === "number" ? parseInt(num) : faker.datatype.number(),
        from: req.body.from,
        text: req.body.text,
        timeSent:new Date().toLocaleTimeString(),
    }

    if(!newMessages.from || !newMessages.text){
        return res.status(400).json({ msg: "please make sure that you have added name and message."})
    }
    messages.push(newMessages);
    res.json(messages)
    // res.redirect("/");
})

// Delete message by id
router.delete("/messages/:id", function (req, res) {
    let temp;
    for (let i = 0; i < messages.length; i++){
      if (messages[i].id === parseInt(req.params.id) ){
        temp = messages[i];
        messages.splice(i,1);
      }    
    }
    if (temp === undefined)
    {
      console.log(temp);
      res.status(404).json(messages)
      res.send(`The item ${req.params.id} is not exist`);
    }
    else {
      res.status(200).json(messages)
      res.send(`The item ${req.params.id} has been deleted`); 
    }
  });


// Delete message by id
// router.delete("/messages/:id", (req,res) => {
//     const found = messages.some(message => message.id === parseInt(req.params.id));
//     if(found){
//         res.json({
//             msg: "message  deleted",
//             messages: messages.filter((message,index) => { message.splice(index,1)}  )
//         });
//     }else {
//         res.status(400).json({ msg: `No message with the id of ${req.params.id}`});
//     } 
// });

//  level 5 update Message by id
router.put("/messages/:id", (req,res) => {
    const found = messages.some(message => message.id === parseInt(req.params.id));
    if(found){
        const upMessage = req.body;
        messages.forEach((message) => {
            if(message.id === parseInt(req.params.id)) {
                message.text = upMessage.text ? upMessage.text : message.text;
                message.from = upMessage.from ? upMessage.from : message.from;
                res.status(200).json(messages)
            }
        })
    }else {
        res.status(400).json({ msg: `No message with the id of ${req.params.id}`});
    } 
})






module.exports = router;