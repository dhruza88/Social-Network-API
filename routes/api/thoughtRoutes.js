const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController.js')

router.route("/").get(getThoughts).post(createThought);

router
    .route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);
    
// /api/thoughts/:thoughtiD/reactions
//TODO: add a post reaction route
router.route(`/:thoughtId/reactions`).post(addReaction);

//TODO: delete route to remove a reaction by reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;