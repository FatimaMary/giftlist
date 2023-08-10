import Participants from "../models/Participants.js";
import Users from "../models/Users.js";
import Events from "../models/Event.js";

export const postParticipant = (req, res) => {
  const participantsEmail = req.body.participantsEmail || "";
  const participantsAcceptence = req.body.participantsAcceptence;
  const eventId = req.body.eventId;
  const userId = req.body.userId || "";

  const newParticipant = new Participants({
    participantsEmail,
    participantsAcceptence,
    eventId,
    userId,
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
      // if(participants.length === 0) {
      //     res.status(200).json({ message: 'No Participants found' });
      // } else {
      {
        const participantsDetails = participants.map((participant) => {
          return {
            participantsEmail: participant.participantsEmail,
            participantsAcceptence: participant.participantsAcceptence,
            participantsId: participant.participantsId,
            eventId: participant.eventId,
            userId: participant.userId,
          };
        });
        res.json(participantsDetails);
      }
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const updateParticipant = (req, res) => {
  const participantsId = req.params.participantsId;
  Participants.findOne({ participantsId: participantsId })
    .then((participant) => {
      participant.participantsEmail = req.body.participantsEmail;
      participant.userId = req.body.userId;
      participant
        .save()
        .then(() => res.json("participants details Updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export const getDrawnNames = async (req, res) => {
  const eventId = req.params.eventId;
  try {
    const events = await Events.find({ eventId: eventId });
    if (events.length === 0) {
      return res.status(404).json({ message: "There are no event details" });
    }

    const eventDetail = events.map((singleEvent) => singleEvent.userId);

    const users = await Users.find({ userId: { $in: eventDetail } });
    if (users.length === 0) {
      return res.status(404).json({ message: "No user found" });
    }

    const userDetail = users.map((user) => {
      return user.firstName;
    });
    console.log("userDetail: ", userDetail);

    const participants = await Participants.find({ eventId: eventId });

    const participantEmails = participants.map((participant) => {
      return participant.participantsEmail;
    });

    const usersWithEmail = await Users.find({
      email: { $in: participantEmails },
    });

    const participantsEmailsList = participants.map((participant) => {
      const user = usersWithEmail.find(
        (user) => user.email === participant.participantsEmail
      );

      return {
        // participantEmail: participant.participantsEmail,
        userName: user ? user.firstName : "Unknown",
      };
    });

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    const names = participantsEmailsList.map(
      (participant) => participant.userName
    );
    const renames = names.push(`${userDetail}`);
    shuffleArray(renames);

    const pairings = names.map((giver, index) => ({
      giver,
      receiver: names[(index + 1) % names.length],
    }));

    const event = await Events.findOne({ eventId: eventId });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    event.drawNames = true;
    event.drawnNames = pairings;

    const savedEvent = await event.save();
    console.log("Parings saved: ", savedEvent.drawnNames);

    res.json(savedEvent.drawnNames);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching participants." });
  }
};

export const getEventDetailsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);

    const events = await Events.find({ userId }).exec();
    const eventIds = new Set(events.map((event) => event.eventId));

    const participants = await Participants.find({ userId }).exec();
    const participantEventIds = new Set(
      participants.map((participant) => participant.eventId)
    );

    const eventDetailsPromises = Array.from(eventIds).map((eventId) =>
      Events.findOne({ eventId }).exec()
    );

    const participantEventDetailsPromises = Array.from(participantEventIds)
      .filter((eventId) => !eventIds.has(eventId))
      .map((eventId) => Events.findOne({ eventId }).exec());

    const eventDetailsResults = await Promise.all(eventDetailsPromises);
    const participantEventDetailsResults = await Promise.all(
      participantEventDetailsPromises
    );

    const mergedEventDetails = [
      ...events,
      ...participantEventDetailsResults,
      // ...eventDetailsResults,
    ].filter((event) => event !== null);

    res.json(mergedEventDetails);
  } catch (err) {
    console.error("Error retrieving event details:", err);
    res.status(400).json({ message: err.message });
  }
};

export const getParticipantsIdByUserId = (req, res) => {
  const userId = req.params.userId;
  const eventIdFromUI = req.query.eventId;

  Participants.find({ userId: userId })
    .then((participants) => {
      const matchingParticipants = participants.filter((participant) => {
        return participant.eventId === eventIdFromUI;
      });
      const participantsIds = matchingParticipants.map((participant) => {
        return participant.participantsId;
      });
      res.json(participantsIds);
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};

export const deleteParticipants = (req, res) => {
  const participantsId = req.params.participantsId;
  Participants.findOneAndDelete({ participantsId: participantsId })
    .then((deletedParticipant) => {
      if (!deletedParticipant) {
        return res.status(404).json({ error: "Participant not found" });
      }
      return res
        .status(200)
        .json({ message: "Participant deleted successfully" });
    })
    .catch((err) => res.status(400).json({ message: err.message }));
};
