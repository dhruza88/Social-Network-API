const { Thought, User, Reaction} = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find({})
          .select('-__v')
          .then((thoughts) => res.json(thoughts))
          .catch((err) => res.status(500).json(err));
      },
      // Get a thought
      getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Create a thought
      createThought(req, res) {
        console.log(req.body);
        Thought.create({
          thoughtText: req.body.thoughtText,
          username: req.body.username,
        })
          .then((thought) => {
            User.findOneAndUpdate({_id: req.body._id}, { thoughts: [thought._id] })
            .then(()=>{
              res.json(thought) 
            }).
            catch((error) => {
              console.log(error);
              return res.status(500).json({msg:" unable to add thought to user", error})
            })
          })
        
          .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
      },

      // Delete a thought
      deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : User.deleteMany({ _id: { $in: User.thoughts } })
          )
          .then(() => res.json({ message: 'Thought and username deleted!' }))
          .catch((err) => res.status(500).json(err));
      },

      // Update a thought
      updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      addReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: "No thought with this id!" });
            }
            res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
      // Remove reaction from a thought
      removeReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) => {
            if (!thought) {
              return res.status(404).json({ message: "No thought with this id!" });
            }
            res.json(thought);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
};