import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventId: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    giftExchangeDate: {
        type: String,
        required: true
    },
    rsvpDate: {
        type: String,
        required: true,
    },
    confirmation: {
        type: Boolean,
        required: true,
    },
    budget: {
        type: String,
    },
    userId: {
        type: String,
        required: true
    },
});

const Events = mongoose.model("GiftlistEvents", eventSchema);

export default Events; 