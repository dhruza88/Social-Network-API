const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all students
    getUsers(req, res) {
        User.find()
            .populate({ path: "friends", select: "-__v" })
            .populate({ path: "thoughts", select: "-__v" })
            .select("-__v")
            .then((user) => {
                res.json(user)
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // Get a single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            // .populate("friends")
            .populate({ path: "friends", select: "-__v" })
            .populate({ path: "thoughts", select: "-__v" })
            .select('-__v')

            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user found with that ID' })
                    : res.json(user)
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // create a new user
    addUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    // Delete a user and remove them from the course
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then( (user) => {
            if (!user) {
                return res.status(404).json({ message: "No user found with this ID!" });
            }

                // BONUS: Get ids of user's `thoughts` and delete them all
                return Thought.deleteMany({ _id: { $in: User.thoughts } });
            })
            .then(() => {
                res.json({ message: "User and associated thoughts deleted!" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },


updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user found with this ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},

// Add an friend to a user
addFriend(req, res) {
    console.log('You are adding a friend');
    console.log(req.body);
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
// Remove friend from a user
removeFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
    )
        .then((user) =>
            !user
                ? res
                    .status(404)
                    .json({ message: 'No user found with that ID!' })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
},
};