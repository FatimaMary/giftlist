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
