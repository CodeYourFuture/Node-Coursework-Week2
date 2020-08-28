const express = require('express');
const router = express.Router();
const messages = require('../Messages')




// - [ ] Read all messages

router.get("/", (request, response) => {
    response.json(messages)
});

// - [ ] Read all messages

router.get("/latest", (request, response) => {
    response.json(messages.slice(-10))
});



//Search in messages

router.get("/search", (request, response) => {
    const queryWord = request.query.text
    if (queryWord) {
        const res = messages.filter(message => message.text.toLowerCase().includes(queryWord.toLowerCase()))
        response.json(res)
    }
})


// - [ ] Read one message specified by an ID
router.get("/:id", (request, response) => {
    const id = request.params.id
    const res = messages.find(message => message.id === parseInt(id))
    res ? response.json(res) : response.status(404).json({ msg: 'Message not found' })

});

// - [ ] Create a new message

router.post("/", (request, response) => {
    let time = new Date()
    const newMessage = {
        id: messages.length,
        from: request.body.from,
        text: request.body.text,
        timeSent: time
    }
    if (!newMessage.from && !newMessage.text) {
        return response.status(404).json({ msg: 'Please type a Name and Message' })
    } else {
        messages.push(newMessage)
        response.json(newMessage)
    }
});

// - [ ] Update a message

router.put("/:id", (request, response) => {
    const updatedMessage = request.body.text
    const message = messages.find(message => message.id === parseInt(request.params.id))
    if (message) {
        message.text = updatedMessage
        response.json({ msg: 'Message Updated', message })
    } else {
        response.status(404).json({ msg: 'Message not found' });

    }
});


// - [ ] Delete a message, by ID
router.delete("/:id", (request, response) => {
    const message = messages.find(message => message.id === parseInt(request.params.id))
    if (message) {
        response.json({
            msg: 'Message Deleted',
            customers: customers.filter(customer => customer.id !== parseInt(request.params.id))
        });
    } else {
        response.status.json({ msg: `There isnt a messagge with the id of ${request.params.id}` })
    }
});

module.exports = router


