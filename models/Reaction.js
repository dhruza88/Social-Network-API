const { Schema, model } = require('mongoose');
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
           type: String,
           required:true,
           max_length: 280,
           
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
    },
    {
        toJSON:{
            getters: true,
        },
        id: false,
    }

);

const Thought = model('reaction', reactionSchema);

module.exports = reactionSchema;