const { Schema, model } = require('mongoose');
const thoughtSchema = require('../models/Thought');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/, "Must match an email address!"],

        },
        thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: "Thought"
            },
        ],
        friends: [
            {
            type:Schema.Types.ObjectId,
            ref: "User"
            },
        ],
    },
    {
        

        toJSON: {
            virtuals:true,
        },
        id:false,
    }
);



userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});


const User = model('User', userSchema);

module.exports = User;