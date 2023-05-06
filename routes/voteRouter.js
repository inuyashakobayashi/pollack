// const voteController = require("../app/controllers/vote.controller");
const voteRouter = require("express").Router();
const {addVote, findVote, updateVote, deleteVote} = require("../app/controllers/vote.controller");


voteRouter.post("/lack/:token", addVote);

voteRouter.get("/lack/:token", findVote);

voteRouter.put("/lack/:token", updateVote);

voteRouter.delete("/lack/:token", deleteVote);

module.exports = voteRouter;