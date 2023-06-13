import Events from '../models/Event.js';


export const postEvent = (req, res) => {
    const eventName = req.body.eventName;
    const giftExchangeDate = req.body.giftExchangeDate;
    const rsvpDate = req. body.rsvpDate;
    const confirmation = req.body.confirmation;
    const userId = req.body.userId;

    const newEvent = new Events({
       eventName,
       giftExchangeDate,
       rsvpDate,
       confirmation,
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
          res.status(404).json({ message: 'No event found' });
        } else {
          const eventDetails = events.map(event => {
            return {
              eventName: event.eventName,
              giftExchangeDate: event.giftExchangeDate,
            };
          });
          res.json(eventDetails);
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
}

export const getEventDetailsbyEventId = (req, res) => {
  const eventId = req.params.eventId;
  Events.find({ eventId: eventId })
    .then((events) => {
      if (events.length === 0) {
        res.status(404).json({ message: 'There is no event details' });
      } else {
        const eventDetail = events.map(singleEvent => {
          return {
            eventName: singleEvent.eventName,
            giftExchangeDate: singleEvent.giftExchangeDate,
            rsvpDate: singleEvent.rsvpDate,
            budget: singleEvent.budget,
            details: singleEvent.details,
          };
        });
        res.json(eventDetail);
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
}