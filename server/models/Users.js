import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    birthDay: {
        type: Date
    },
});

const Users = mongoose.model("GiftlistUsers", userSchema);

export default Users; 