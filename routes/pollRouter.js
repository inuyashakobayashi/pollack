const pollController = require("../app/controllers/poll.controller.js");
const router = require("express").Router();
const express = require("express");


router.post("/lack", pollController.addPoll);



router.get("/lack/:token", pollController.getPollStatistics);

router.put("/lack/:token", pollController.updatePoll);

router.delete("/lack/:token", pollController.deletePoll);

module.exports = router;