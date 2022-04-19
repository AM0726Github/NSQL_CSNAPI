const { User, Thought } = require("../models");

const userController = {

    // Method for all users 
    getAllFromUsers(req, res) {
        User.find({})
            .populate({ 
                path: "thoughts", 
                select: "-__v" 
            })
            .select("-__v")
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Method for Single/Each User
    getUserById(req, res) {
        User.findById({ _id: req.params.userId })
            .populate({ 
                path: "thoughts", 
                select: "-__v" 
            })
            .select("-__v")
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Wrong User ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add New User
    createUser(req, res) {
        User.create(req.body)
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => res.status(500).json(err));
    },

    // Update User Data
    updateUser(req, res) {
        User.findOneAndUpdate(
                { _id: req.params.userId }, 
                body, 
                { new: true, runValidators: true }
            )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Wrong User ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete actual User
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Wrong User ID!" });
                    return;
                }
                res.json(dbUserData);

                // Delete all data to the deleted User
                dbUserData.thoughts.forEach((thought) => {
                Thought.findOneAndDelete({ _id: thought._id })
                    .then((dbThoughtData) => {
                        console.log(dbThoughtData);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add friend to User
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Wrong User ID!" });
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Remove Friend from user data
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
                res.status(404).json({ message: "Wrong User ID!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
};

module.exports = userController;