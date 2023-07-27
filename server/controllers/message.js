import Messages from "../models/Message.js";

export const postMessage = (req, res) => {
  const message = req.body.message;
  const userId = req.body.userId;
  const eventId = req.body.eventId;
  const participantsId = req.body.participantsId;
  const timeStamp = Date.now();

  const newMessage = new Messages({
    message,
    userId,
    eventId,
    participantsId,
    timeStamp,
  });
  newMessage
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllMessages = (req, res) => {
  Messages.find()
    .then((messages) => res.json(messages))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getMessagesByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Messages.find({ eventId: eventId })
    .then((messages) => {
      const messageDetails = messages.map((singleMessage) => {
        return {
          message: singleMessage.message,
          userId: singleMessage.userId,
          eventId: singleMessage.eventId,
          participantsId: singleMessage.participantsId,
          timeStamp: singleMessage.timeStamp,
        };
      });
      res.json(messageDetails);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
