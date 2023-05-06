// const pollController = require("../app/controllers/poll.controller.js");
const router = require("express").Router();
const {addPoll, getPollStatistics, updatePoll, deletePoll, pollValidationRules} = require("../app/controllers/poll.controller.js");


router.post("/lack",pollValidationRules, addPoll);

router.get("/lack/:token", getPollStatistics);

router.put("/lack/:token", updatePoll);

router.delete("/lack/:token", deletePoll);

module.exports = router;