import Participants from "../models/Participants.js";
import Users from '../models/Users.js';

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
           participant
            .save()
            .then(() => res.json("participants details Updated"))
            .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// export const getDrawnNames = async (req, res) => {
//     try {
//       const groupId = req.params.groupId;
  
//       const playGroup = await PlayGroup.findOne({ groupId: groupId });
  
//       if (!playGroup) {
//         return res.status(404).json({ message: 'Group not found' });
//       }
  
//       const names = playGroup.friendsIdArray;
//       const newNamesArray = names.push(`${playGroup.organiserName}`);
  
//       // console.log(newNamesArray)
  
//       function shuffleArray(array) {
//         for (let i = array.length - 1; i > 0; i--) {
//           const j = Math.floor(Math.random() * (i + 1));
//           [array[i], array[j]] = [array[j], array[i]];
//         }
//       }
  
//       shuffleArray(names);
//       const pairings = names.map((giver, index) => ({
//         giver,
//         receiver: names[(index + 1) % names.length],
//       }));
  
//       const namesCollection = await PlayGroup.updateOne(
//         { groupId: groupId },
//         { $set: { friendsIdArray: pairings } }
//       );
  
//       const retrievedPairings = await PlayGroup.findOne({ groupId: groupId });
  
//       retrievedPairings.friendsIdArray.forEach((pairing) => {
//         console.log(`${pairing.giver} is the Secret Santa for ${pairing.receiver}`);
//       });
  
//       return res.status(200).json({ message: 'Secret Santa draw completed' });
//     } catch (err) {
//       return res.status(400).json({ error: err.message });
//     }
//   };

export const getDrawnNames = async (req, res) => {
    const eventId = req.params.eventId;
  
    try {
      const participants = await Participants.find({ eventId: eventId }).exec();
  
      const participantEmails = participants.map((participant) => {
        return participant.participantsEmail;
      });
  
      const users = await Users.find({ email: { $in: participantEmails } }).exec();
  
      const participantsEmailsList = participants.map((participant) => {
        const user = users.find((user) => user.email === participant.participantsEmail);
  
        return {
          participantEmail: participant.participantsEmail,
          userName: user ? user.firstName : "Unknown" // Add the user name or 'Unknown' if not found
        };
      });
  
      res.json(participantsEmailsList);
    } catch (error) {
      res.status(500).json({ error: "An error occurred while fetching participants." });
    }
  };
  