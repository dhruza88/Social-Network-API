const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userController.js')

module.exports = router;