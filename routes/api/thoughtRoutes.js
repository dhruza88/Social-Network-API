const router = require('express').Router();
const {
    getThoughts,
    getsingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtController.js')