const db = require("../models");
const User = db.users;
const Vote = db.votes;
const Poll = db.polls;
const Poll_option = db.polls_options;
const Token = db.tokens;

//Add a new vote to the poll
const addVote = async (req, res) => {
    const tokenValue = req.params.token;
    const { owner, choice } = req.body;
  
    try {
      const token = await Token.findOne({ where: { value: tokenValue } });
  
      if (!token) {
        return res.status(404).json({ code: 404, message: 'Token not found' });
      }
  
      const poll = await Poll.findByPk(token.poll_id);
  
      if (!poll) {
        return res.status(404).json({ code: 404, message: 'Poll not found' });
      }
  
      const user = await User.create({ name: owner.name });
      const votePromises = choice.map(({ id, worst }) =>
        Vote.create({
          user_id: user.id,
          poll_option_id: id,
          poll_id: poll.id,
          worst: worst || false,
        })
      );
      const votes = await Promise.all(votePromises);
  
      res.status(200).json({
        description: 'The result after creating a vote.',
        edit: {
          link: '/vote/edit/' + tokenValue,
          value: tokenValue,
        },
      });
    } catch (error) {
        console.error('Error in addVote:', error);
        res.status(405).json({ code: 405, message: 'Invalid input' });
    }
};

//Find the vote of the token
const findVote = async (req, res) => {
    res.send("Hallo from vote");
};

//Update a vote of the token
const updateVote = async (req, res) => {
    
};

//Delete a vote of the token
const deleteVote = async (req, res) => {
    
};

module.exports = { addVote, findVote, updateVote, deleteVote }