const voteController = require("../app/controllers/vote.controller");
const voteRouter = require("express").Router();


voteRouter.post("/lack/:token", voteController.addVote);

voteRouter.get("/lack/:token", voteController.findVote);

voteRouter.put("/lack/:token", voteController.updateVote);

voteRouter.delete("/lack/:token", voteController.deleteVote);

module.exports = voteRouter;