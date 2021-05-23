const express = require("express");
const router = express.Router();
const uuid = require("uuid"); 
const messages = require("../Messages");

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
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    } 
})

// create Messages
router.post("/messages", (req, res) => {
    const newMessages = {
        id: uuid.v4(),
        from: req.body.from,
        text: req.body.text,
    }

    if(!newMessages.from || !newMessages.text){
        return res.status(400).json({ msg: "please make sure that you have added name and message."})
    }
    messages.push(newMessages);
    // res.json(messages)
    res.redirect("/");
})


// Delete message
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









module.exports = router;