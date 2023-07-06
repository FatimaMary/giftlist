import Participants from "../models/Participants.js";
import Users from '../models/Users.js';
import Events from "../models/Event.js";

export const postParticipant = (req, res) => {
    const participantsEmail = "";
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
            // if(participants.length === 0) {
            //     res.status(200).json({ message: 'No Participants found' });
            // } else {
                {const participantsDetails = participants.map(participant => {
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
      return res.status(404).json({ message: 'There are no event details' });
    }

    const eventDetail = events.map((singleEvent) => singleEvent.userId);

    const users = await Users.find({ userId: { $in: eventDetail } });
    if (users.length === 0) {
      return res.status(404).json({ message: 'No user found' });
    }

    const userDetail = users.map((user) => {
      return  user.firstName

    });
    console.log('userDetail: ', userDetail);

    const participants = await Participants.find({ eventId: eventId });

    const participantEmails = participants.map((participant) => {
      return participant.participantsEmail;
    });

    const usersWithEmail = await Users.find({ email: { $in: participantEmails } })

    const participantsEmailsList = participants.map((participant) => {
      const user = usersWithEmail.find((user) => user.email === participant.participantsEmail);

      return {
        // participantEmail: participant.participantsEmail,
        userName: user ? user.firstName : 'Unknown',
      };
    });

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
    const names = participantsEmailsList.map((participant) => participant.userName)
    const renames = names.push(`${userDetail}`)
    shuffleArray(renames);

    const pairings = names.map((giver, index) => ({
      giver,
      receiver: names[(index + 1) % names.length],
    }));

    const event = await Events.findOne({ eventId: eventId });
    if(!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
      event.drawNames = true;
      event.drawnNames = pairings;

      const savedEvent = await event.save();
      console.log("Parings saved: ", savedEvent.drawnNames);
    

    res.json(savedEvent.drawnNames);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching participants.' });
  }
};


// export const getEventDetailsByUserId = (req, res) => {
//   const userId = req.params.userId;
//   console.log("userId:", userId);

//   const eventsPromise = Events.find({ userId: userId })
//   const participantsPromise = Participants.find({ userId: userId })

//   Promise.all([eventsPromise, participantsPromise])
//     .then(([events, participants]) => {
//       if (events.length === 0) {
//         return res.status(404).json({ message: 'No event found' });
//       }

//       const eventDetails = events.map(event => {
//         return {
//           eventId: event.eventId,
//           eventName: event.eventName,
//           giftExchangeDate: event.giftExchangeDate,
//           rsvpDate: event.rsvpDate,
//           confirmation: event.confirmation,
//           drawNames: event.drawNames,
//           drawnNames: event.drawnNames,
//           userId: event.userId,
//           budget: event.budget,
//           detaiils: event.details,
//         };
//       });

//       const eventIdList = participants.map(participant => {
//         return {
//           eventId: participant.eventId,
//         };
//       });

//       const eventDetailsPromises = eventIdList.map(event =>
//         Events.findOne({ eventId: event.eventId })
//       );

//       Promise.all(eventDetailsPromises)
//         .then(eventDetailsResults => {
//           const mergedEventDetails = eventDetails.concat(eventDetailsResults);
//           res.json(mergedEventDetails);
//         })
//         .catch(err => {
//           console.error("Error retrieving event details:", err);
//           res.status(400).json({ message: err.message });
//         });
//     })
//     .catch(err => {
//       console.error("Error retrieving events and participants:", err);
//       res.status(400).json({ message: err.message });
//     });
// };

export const getEventDetailsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);

    const events = await Events.find({ userId }).exec();
    const eventIds = events.map(event => event.eventId);

    const participants = await Participants.find({ userId }).exec();
    const participantEventIds = participants.map(participant => participant.eventId);

    const eventDetailsPromises = eventIds.map(eventId => Events.findOne({ eventId }).exec());
    const participantEventDetailsPromises = participantEventIds.map(eventId => Events.findOne({ eventId }).exec());

    const eventDetailsResults = await Promise.all(eventDetailsPromises);
    const participantEventDetailsResults = await Promise.all(participantEventDetailsPromises);

    const mergedEventDetails = [...events,  ...participantEventDetailsResults].filter(
    event => event !== null
    );
    res.json(mergedEventDetails);
  } catch (err) {
    console.error("Error retrieving event details:", err);
    res.status(400).json({ message: err.message });
  }
};

