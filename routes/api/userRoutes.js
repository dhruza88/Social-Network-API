const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    addUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController.js')

router.route("/").get(getUsers).post(addUser);

router.route("/:userId")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/').post(addFriend);

router.route('/:userId/friends/:friendsId').delete(removeFriend);

module.exports = router;