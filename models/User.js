const { Schema, model } = require('mongoose');

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

        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    },
    {
        toJSON:{
            getters:true,
        },
    }
);

const User = model('user', userSchema);

module.exports = User;