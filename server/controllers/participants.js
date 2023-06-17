import Participants from "../models/Participants.js";

export const postParticipant = (req, res) => {
    const participantsEmail = req.body.participantsEmail;
    const participantsAcceptence = req.body.participantsAcceptence;
    const eventId = req.body.eventId;

    const newParticipant = new Participants({
        participantsEmail,
        participantsAcceptence,
        eventId
    });
    newParticipant
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

export const getAllParticipants = (req, res) => {
    Participants.find()
    .then((participants) => res.json(participants))
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getParticipantsByEventId = (req, res) => {
    const eventId = req.params.eventId;
    Participants.find({ eventId: eventId })
        .then((participants) => {
            if(participants.length === 0) {
                res.status(404).json({ message: 'No Participants found' });
            } else {
                const participantsDetails = participants.map(participant => {
                    return {
                        participantsEmail: participant.participantsEmail,
                        participantsAcceptence: participant.participantsAcceptence,
                        participantsId: participant.participantsId,
                        eventId: participant.eventId,
                    };
                });
                res.json(participantsDetails);
            }
        })
        .catch((err) => res.status(400).json({ message: err.message }));
};