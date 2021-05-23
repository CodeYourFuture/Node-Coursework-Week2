const express = require("express");
const router = express.Router();
const uuid = require("uuid"); 
const { includes } = require("../Messages");
const messages = require("../Messages");
const lodash = require('lodash'); 

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
    const newMessages = {
        id: uuid.v4(),
        from: req.body.from,
        text: req.body.text,
        timeSent:new Date().toLocaleTimeString(),
    }

    if(!newMessages.from || !newMessages.text){
        return res.status(400).json({ msg: "please make sure that you have added name and message."})
    }
    messages.push(newMessages);
    // res.json(messages)
    res.redirect("/");
})


// Delete message by id
router.delete("/messages/:id", (req,res) => {
    const found = messages.some(message => message.id === parseInt(req.params.id));
    if(found){
        res.json({
            msg: "message  deleted",
            messages: messages.filter(message =>  message.id !== parseInt(req.params.id))
        });
    }else {
        res.status(400).json({ msg: `No message with the id of ${req.params.id}`});
    } 
});

//  level 5 update Message by id
router.put("/messages/:id", (req,res) => {
    const found = messages.some(message => message.id === parseInt(req.params.id));
    if(found){
        const upMessage = req.body;
        messages.forEach((message) => {
            if(message.id === parseInt(req.params.id)) {
                message.text = upMessage.text ? upMessage.text : message.text;
                message.from = upMessage.from ? upMessage.from : message.from;

                res.json({ msg: "message updated", message })
            }
        })
    }else {
        res.status(400).json({ msg: `No message with the id of ${req.params.id}`});
    } 
})






module.exports = router;