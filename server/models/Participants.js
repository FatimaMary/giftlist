import mongoose from 'mongoose';
import autoIncrement from 'mongoose-plugin-autoinc';

const participantsSchema = new mongoose.Schema({
    participantsId : {
        type: String,
        unique: true,
        required: true,
    },
    participantsEmail : {
        type: String,
    },
    participantsAcceptence: {
        type: Boolean,
        required: true,
    },
    eventId : {
        type: String,
        required: true,
    },
    userId : {
        type: String,
    }
});

participantsSchema.plugin(autoIncrement.plugin, {
    model: "GiftlistParticipants",
    field: "participantsId",
    startAt: 1,
    incrementBy: 1,
});

const Participants = mongoose.model("GiftlistParticipants", participantsSchema);

export default Participants;