const validateMessage = (message) => {
  return JSON.stringify(message) === "{}";
};

module.exports = validateMessage;
