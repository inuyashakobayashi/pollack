const pollController = require("../app/controllers/poll.controller.js");
const router = require("express").Router();
const express = require("express");


router.post("/lack", pollController.addPoll);



// router.get("/lack/:token", pollController.addPoll);

router.put("/lack/:token", pollController.updatePoll);

router.delete("/lack/:token", pollController.deletePoll);

module.exports = router;