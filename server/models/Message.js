import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";

const messageSchema = new mongoose.Schema({
  messageId: {
    type: String,
    unique: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
  },
  time: {
    type: String,
  },
  likes: {
    type: String,
  },
  UserId: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  participantsId: {
    type: String,
    required: true,
  },
});
