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
        user.firstName = req.body.firstName;
        user.secondName = req.body.secondName;
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

export const getUserByEmail = (req, res) => {
    const email = req.params.email
    Users.findOne({ email: email })
        .then((user) => {
            const userDetails = user.map(singleUser => {
                return {
                    firstName: singleUser.firstName,
                    secondName: singleUser.secondName,
                }
            });
            res.json(userDetails);
        })
        .catch((err) => res.status(400).json("Error: " + err));
}