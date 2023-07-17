import Events from "../models/Event.js";
import Users from "../models/Users.js";
import Participants from "../models/Participants.js";

export const postEvent = (req, res) => {
  const eventName = req.body.eventName;
  const giftExchangeDate = req.body.giftExchangeDate;
  const rsvpDate = req.body.rsvpDate;
  const confirmation = req.body.confirmation;
  const drawNames = "false";
  const userId = req.body.userId;

  const newEvent = new Events({
    eventName,
    giftExchangeDate,
    rsvpDate,
    confirmation,
    drawNames,
    userId,
  });

  newEvent
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllEvents = (req, res) => {
  Events.find()
    .then((events) => res.json(events))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const updateEvent = (req, res) => {
  const eventId = req.params.eventId;
  Events.findOne({ eventId: eventId })
    .then((event) => {
      event.budget = req.body.budget;
      event.details = req.body.details;
      event
        .save()
        .then(() => res.json("Event Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getEventsById = (req, res) => {
  const userId = req.params.userId;
  Events.find({ userId: userId })
    .then((events) => {
      if (events.length === 0) {
        res.status(404).json({ message: "No event found" });
      } else {
        const eventDetails = events.map((event) => {
          return {
            eventId: event.eventId,
            eventName: event.eventName,
            giftExchangeDate: event.giftExchangeDate,
          };
        });
        res.json(eventDetails);
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const getEventDetailsbyEventId = (req, res) => {
  const eventId = req.params.eventId;
  Events.find({ eventId: eventId })
    .then((events) => {
      if (events.length === 0) {
        res.status(404).json({ message: "There is no event details" });
      } else {
        const eventDetail = events.map((singleEvent) => {
          return {
            eventName: singleEvent.eventName,
            giftExchangeDate: singleEvent.giftExchangeDate,
            rsvpDate: singleEvent.rsvpDate,
            budget: singleEvent.budget,
            details: singleEvent.details,
            userId: singleEvent.userId,
            drawNames: singleEvent.drawNames,
            drawnNames: singleEvent.drawnNames,
            confirmation: singleEvent.confirmation,
          };
        });
        res.json(eventDetail[0]);
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const getuserNameByEventId = (req, res) => {
  const eventId = req.params.eventId;
  Events.find({ eventId: eventId })
    .then((events) => {
      if (events.length === 0) {
        res.status(404).json({ message: "There is no event details" });
      } else {
        const eventDetail = events.map((singleEvent) => singleEvent.userId);

        Users.find({ userId: { $in: eventDetail } })
          .then((users) => {
            if (users.length === 0) {
              res.status(404).json({ message: "No user" });
            } else {
              const userDetail = users.map((user) => {
                return {
                  firstName: user.firstName,
                  secondName: user.secondName,
                };
              });
              console.log("userDetail: ", userDetail);
              res.json(userDetail[0]);
            }
          })
          .catch((err) => res.status(500).json({ message: err.message }));
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const editEvent = (req, res) => {
  const eventId = req.params.eventId;
  Events.findOne({ eventId: eventId })
    .then((event) => {
      event.eventName = req.body.eventName;
      event.giftExchangeDate = req.body.giftExchangeDate;
      event.rsvpDate = req.body.rsvpDate;
      event.budget = req.body.budget;
      event.details = req.body.details;
      event
        .save()
        .then(() => res.json("Event Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// export const deleteEvent = (req, res) => {
//   const eventId = req.params.eventId;
//   Events.findOneAndDelete({ eventId: eventId })
//     .then((deletedEvent) => {
//       if (!deletedEvent) {
//         return res.status(404).json({ error: "Event not found" });
//       }
//       return res.status(200).json({ message: "Event deleted successfully" });
//     })
//     .catch((err) => {
//       return res.status(500).json({ error: "Failed to delete event" });
//     });
// };

export const deleteEvent = (req, res) => {
  const eventId = req.params.eventId;
  Promise.all([
    Events.findOneAndDelete({ eventId }),
    Participants.deleteMany({ eventId }),
  ])
    .then(([deletedEvent, deletedParticipants]) => {
      if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
      }
      return res.status(200).json({ message: "Event deleted successfully" });
    })
    .catch((err) => {
      return res.status(500).json({ error: "Failed to delete event" });
    });
};

export const updateDrawNames = (req, res) => {
  const eventId = req.params.eventId;
  Events.findOne({ eventId: eventId })
    .then((event) => {
      event.drawNames = req.body.drawNames;
      event
        .save()
        .then(() => res.json("Event Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};
