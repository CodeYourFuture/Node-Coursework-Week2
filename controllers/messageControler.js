const messagesData = require("../server");

exports.getAllMessages = async (req, res, next) => {
  res.status(200).json({
    status: "success",
    results: messagesData.length,
    data: {
      messagesData,
    },
  });
};
