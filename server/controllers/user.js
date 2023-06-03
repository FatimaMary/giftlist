import Users from "../models/Users.js";
import mongoose from "mongoose";

export const postUser = (req, res) => {
    const userId = req.body.userId;
    console.log("userId: ", userId);
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new Users({
        userId,
        email,
        password,
    });

    newUser
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json("Error: " + err));
};

export const updateUser = (req, res) => {
    const userId = req.params.userId;
    Users.findOne({ userId: userId })
    .then((user) => {
        user.name = req.body.name;
        user.birthDay = req.body.birthDay;
        user
            .save()
            .then(() => res.json("user Updated"))
            .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
}

export const getUser = (req, res) => {
    Users.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(400).json("Error: " + err));
};