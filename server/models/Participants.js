import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

const participantsSchema = new mongoose.Schema({
    participantsId : {
        type: String,
        unique: true,
        required: true,
    },
    participantsEmail : {
        type: String,
        required: true,
    },
    participantsAcceptence: {
        type: Boolean,
        required: true,
    },
    eventId : {
        type: String,
        required: true,
    },
});

participantsSchema.plugin(autoIncrement.plugin, {
    model: "GiftlistParticipants",
    field: "participantsId",
    startId: 1,
    incrementBy: 1,
});

const Participants = mongoose.model("GiftlistParticipants", participantsSchema);

export default Participants;