const data = {
  messages: require("../model/messages.json"),
  setMessages: function (data) {
    this.messages = data;
  },
};

const getAllMessages = (req, res) => {
  res.json(data.messages);
};

const creatMessage = (req, res) => {
  const { from, text } = req.body;
  const newMessage = {
    id: data.messages[data.messages.length - 1].id + 1 || 1,
    from,
    text,
    timeSent: new Date().toLocaleDateString(), // may change to date-fns when loaded,
  };
  if (!newMessage.from || !newMessage.text) {
    return res.status(400).json({ message: "first name and text required" });
  }

  data.setMessages([...data.messages, newMessage]);

  res.status(201).json({ message: "Message sent." });
};

const searchAllMessages = async (req, res) => {
  try {
    let filteredMessages = [];
    const { term } = req.query;
    console.log(term, "term");
    if (!term) {
      return res.status(400).json({ error: "Search term is required" });
    }
    console.log(data.messages.length > 1000);
    if (data.messages.length > 1000) {
      // if the messages are significant in size use async
      filteredMessages = await new Promise((resolve, reject) => {
        const matchingMessages = data.messages.filter((message) =>
          message.text.toLowerCase().includes(term.toLowerCase())
        );
        resolve(matchingMessages);
      });
    }

    filteredMessages = data.messages
      .filter((message) => {
        return (
          message.from.toLowerCase().includes(term.toLowerCase()) ||
          message.text.toLowerCase().includes(term.toLowerCase())
        );
      })
      .sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

    console.log(data.messages, "filtred mesage");
    console.log(filteredMessages, "filtred2 mesage");
    // could add logic to depeniding on screen size ,
    // feature detection logic would be better placed in difrent middle ware?
    if (!filteredMessages) {
      return res.status(400).json({ message: `no message found` });
    }
    const messagesPerPage = 15;
    const page = req.query.page || 1;
    const startIndex = (page - 1) * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    const pageMessages = filteredMessages.slice(startIndex, endIndex);

    res.status(200).json(pageMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const searchAllByName = (req, res) => {
  const userName = req.params.name.toLowerCase().trim();
  if (!userName) {
    return res.status(400).json({ message: `user ${userName} not found` });
  }
  const foundMessages = data.messages.filter((message) => message.from.toLowerCase() === userName);
  if (!foundMessages) {
    return res.status(400).json({ message: `no message found` });
  }
  const filteredMessages = foundMessages.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
  res.status(200).json(filteredMessages);
};

const getLatestMessages = (req, res) => {
  const startIndex = Math.max(data.messages.length - 10, 0);
  const latestMessages = data.messages.slice(startIndex);
  if (!latestMessages) {
    return res.status(400).json({ message: `no messages, please send one` });
  }
  res.status(200).json(latestMessages);
};

const getOneMessage = (req, res) => {
  const id = req.params.id;

  const message = data.messages.find((message) => message.id === parseInt(id));
  if (!message) {
    return res.status(400).json({ message: `no message found` });
  }

  res.status(200).json(message);
};

const updateMessage = (req, res) => {
  const id = req.params.id;
  const { text } = req.body;
  const messageToUpdate = data.messages.find((msg) => msg.id === parseInt(id));

  if (!messageToUpdate) {
    //set res object status code , and body with message parsed as json
    return res.status(400).json({ message: `message ID ${id} not found` });
  }
  if (req.body.text) messageToUpdate.text = text;
  const filteredMessages = data.messages.filter(
    (message) => message.id !== parseInt(req.params.id)
  );
  const unsortedMessages = [...filteredMessages, messageToUpdate];
  data.setMessages(unsortedMessages.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0)));

  res.json(data.messages);
};

const deleteMessage = (req, res) => {
  const id = req.params.id;
  messages = data.messages.find((msg) => msg.id === parseInt(id));
  if (!message) {
    return res.status(400).json({ message: `Message ID ${id} not found` });
  }
  const filteredMessages = data.messages.filter(
    (message) => message.id !== parseInt(req.params.id)
  );
  data.setMessages([...filteredMessages]);
  res.json(data.messages);
};
module.exports = {
  getAllMessages,
  getOneMessage,
  getLatestMessages,
  creatMessage,
  searchAllMessages,
  searchAllByName,
  updateMessage,
  deleteMessage,
};
