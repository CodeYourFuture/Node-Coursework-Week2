const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

const database = require('../messages.json');

//Create New Message
router.post('/', (req, res) => {
    const message = {
        id: uuidv4(),
        from: req.body.from,
        text: req.body.text
    };

    if (!message) {
        return res.status(400).json({msg: "Request Body Does Not Exist Or Is Invalid"});
    }

    else if (!message.from) {
        return res.status(400).json({msg: "From property does not exist or is Invalid (not a string)"});
    }

    else if (!message.text) {
        return res.status(400).json({msg: "Text property does not exist or is invalid (not a string)"});
    }

    else {
        database.push(message)
        res.status(200).json({msg: "Message Sent!", messages: database});
    }

})


//Get All Messages
router.get('/', (req, res) => {
    res.json(database)
});


//Read Specific Message
router.get('/:id', (req, res) => {
    const found = database.some(message => message.id === parseInt(req.params.id));

    if (found) {
        return res.json(database.filter(message => message.id === parseInt(req.params.id)));
    }

    else {
        res.status(400).json({msg: `Cannot find user with the id of ${req.params.id}`});
    }
});


//Delete Message By Id
router.delete('/:id', (req, res) => {
    const found = database.some(message => message.id === parseInt(req.params.id));

    if (found) {
        return res.json(database.filter(message => message.id !== parseInt(req.params.id)));
    }

    else {
        res.status(400).json({msg: `Cannot find user with the id of ${req.params.id}`});
    }
});

module.exports = router;