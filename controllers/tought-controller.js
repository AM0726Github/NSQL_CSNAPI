const { Thought, User } = require("../models");

const thoughtController = {

    // Method to get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Get single/each thought
    getThoughtById(req, res) {
        Thought.findById({ _id: req.params.id })
            .select('-__v')
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "Wrong Tought ID!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Create New Thought
    addThought(req, res) {
        let thoughtId;
        Thought.create(req.body)
            .then(({ _id }) => {
                thoughtId = _id;
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
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

    // Update thought data
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id }, 
            req.body, {
                new: true,
                runValidators: true,
            }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "Wrong Tought ID!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Delete Thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "Wrong Tought ID!" });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // Add new reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            {
                new: true,
                runValidators: true,
            }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                res.status(404).json({ message: "Wrong Tought ID!" });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    // delete reaction by id
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: rerq.body.reactionId } } },
            { new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                res.status(404).json({ message: "Wrong Tought ID!" });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

module.exports = thoughtController;