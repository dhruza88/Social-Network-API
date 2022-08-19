const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_lengtth:1,
            max_length: 280,
        },
        createdAt: {
           type: Date,
           
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]

    },
    {
        toJSON:{
            getters:true,
        },
    }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;