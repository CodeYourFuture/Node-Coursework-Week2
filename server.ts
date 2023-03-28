import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
type MessagesType = {
  id: string;
  from: string;
  text: string;
};
const welcomeMessage: MessagesType = {
  id: (0).toString(),
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages: MessagesType[] = [welcomeMessage];

const validateMessage = (message: MessagesType) => {
  if (!message.from || !message.text) {
    return false;
  }
  return true;
};

app.get("/", function (req: Request, res: Response) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/messages", (req: Request, res: Response) => {
  res.send(messages);
});
app.get("/messages/latest", (req: Request, res: Response) => {
  res.send(
    messages.length <= 10 ? messages : messages.slice(messages.length - 10)
  );
});
app.get("/messages/search", (req: Request, res: Response) => {
  const searchText = <string>req.query.text;
  res.send(messages.filter(({ text }) => text.includes(searchText)));
});

app.get("/messages/:messagesId", (req: Request, res: Response) => {
  const messagesId = req.params.messagesId;
  res.send(messages.filter(({ id }) => id === messagesId));
});

app.post("/messages", (req: Request, res: Response) => {
  const isValid = validateMessage(req.body);
  if (!isValid) {
    return res.status(400).json(`Your name or message are missing.`);
  }

  messages.push({
    ...req.body,
    id: (messages[messages.length - 1].id + 1).toString(),
    timeSent: new Date().toUTCString(),
  });
  return res.send(messages);
});

app.put("/messages/:messagesId", (req: Request, res: Response) => {
  const index = messages.findIndex(({ id }) => id === req.params.messagesId);
  const isValid = validateMessage(req.body);
  if (!isValid) {
    return res.status(400).json(`Your name or message are missing.`);
  }
  if (index === -1) {
    return res.status(404).json(`no message with id ${req.params.messagesId}`);
  }
  messages[index] = {
    ...messages[index],
    ...req.body,
  };
  return res.send(messages);
});
app.delete("/messages/:messagesId", (req: Request, res: Response) => {
  messages = messages.filter(({ id }) => id !== req.params.messagesId);
  res.send(messages);
});
app.listen(process.env.PORT, () => console.log(`listening...`));
