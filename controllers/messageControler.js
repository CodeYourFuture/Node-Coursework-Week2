const messagesData = require("../server");

exports.getAllMessages = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: messagesData.length,
    data: {
      msg: messagesData.messages,
    },
  });
};

exports.createMessage = async (req, res, next) => {
  const { from, text } = req.body;
  const id = messagesData.messages[messagesData.messages.length - 1].id + 1;
  const requestTime = new Date().toISOString();
  const newMessage = { id, from, text, requestTime };
  try {
    console.log("lol?");
    if (
      !newMessage.from ||
      newMessage.from === "" ||
      !newMessage.text ||
      newMessage.text === ""
    ) {
      console.log("lol??");
      throw new Error("Empty field: from or text or both");
    }

    messagesData.messages.push(newMessage);

    res.status(201).json({
      status: "success",
      data: {
        msg: newMessage,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMessage = async (req, res, next) => {
  console.log(+req.params.id);
  const query = +req.params.id;
  const msg = messagesData.messages.find((item) => item.id === query);

  res.status(200).json({
    status: "success",
    data: {
      msg,
    },
  });
};

exports.deleteMessage = async (req, res, next) => {
  const query = +req.params.id;
  const index = messagesData.messages.findIndex((item) => item.id === query);
  const newArray = [...messagesData.messages];
  console.log(newArray);
  newArray.splice(index, 1);
  messagesData.messages = [...newArray];

  console.log(messagesData.messages);
  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.searchMessages = async (req, res, next) => {
  const query = req.query.text.toLowerCase();
  const queryArray = messagesData.messages.filter((item) =>
    item.text.toLowerCase().includes(query)
  );

  res.status(200).json({
    status: "success",
    data: {
      msg: queryArray,
    },
  });
};
