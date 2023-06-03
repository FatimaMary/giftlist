import Events from '../models/Event';


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

        event
            .save()
            .then(() => res.json("Event Updated"))
            .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}