const db = require("../models");
const { body, validationResult } = require('express-validator');
const Poll = db.polls;
const Poll_setting = db.polls_settings;
const Poll_option = db.polls_options;
const Token = db.tokens;
const crypto = require("crypto");
const Vote = db.votes;

const pollValidationRules = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('options').isArray({ min: 1 }).withMessage('At least one option is required'),
  body('options.*.text').notEmpty().withMessage('Option text is required'),
  body('setting.voices').isInt({ min: 1 }).withMessage('Voices should be an integer greater than 0'),
  body('setting.worst').isBoolean().withMessage('Worst should be a boolean value'),
  body('setting.deadline').isISO8601().withMessage('Deadline should be a valid ISO 8601 date format'),
];

// Create and Save new Polls
const addPoll = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(405).json({ code: 405, message: 'Invalid input' });
  }

  let pollBody = {
    title: req.body.title,
    description: req.body.description,
    options: req.body.options,
    setting: req.body.setting,
    fixed: req.body.fixed
  }

  try {
    const poll = await Poll.create({
      title: pollBody.title,
      description: pollBody.description,
      fixed: pollBody.fixed
    })

    const poll_options = pollBody.options.map(option => {
      return Poll_option.create({
        text: option.text,
        poll_id: poll.id,
      })
    })

    const poll_setting = Poll_setting.create({
      voices: pollBody.setting.voices,
      worst: pollBody.setting.worst,
      deadline: pollBody.setting.deadline,
      poll_id: poll.id
    })

    // Generate a random string for the admin link and share link
    const adminTokenValue = crypto.randomBytes(16).toString("hex");
    const shareTokenValue = crypto.randomBytes(16).toString("hex");

    // Create tokens for the admin link and share link
    const adminToken = await Token.create({
      link: "admin",
      value: adminTokenValue,
      poll_id: poll.id,
      token_type: "admin"
    })

    const shareToken = await Token.create({
      link: "share",
      value: shareTokenValue,
      poll_id: poll.id,
      token_type: "share"
    })

    res.status(200).send({
      admin: {
        link: "admin",
        value: adminToken.value
      },
      share: {
        link: "share",
        value: shareToken.value
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      code: 500,
      message: 'Internal server error'
    });
  }
};


// const updatePoll = async (req, res) => {
//     const tokenValue = req.params.token;
//     const pollBody = req.body;

//     try {
//         const token = await Token.findOne({
//             where: { value: tokenValue, link: "admin" } //! muss noch ändern(nach token_type==admin suchen und nicht nach link==admin)
//         });

//         if (!token) {
//             res.status(404).send({ code: 404, message: "Poll not found." });
//             return;
//         }

//         const pollId = token.poll_id;

//         await Poll.update({
//             title: pollBody.title,
//             description: pollBody.description,
//             fixed: pollBody.fixed
//         }, {
//             where: { id: pollId }
//         });

//         await Poll_option.destroy({ where: { poll_id: pollId } });
//         const poll_options = pollBody.options.map(option => {
//             return Poll_option.create({
//                 text: option.text,
//                 poll_id: pollId,
//             });
//         });

//         await Poll_setting.update({
//             voices: pollBody.setting.voices,
//             worst: pollBody.setting.worst,
//             deadline: pollBody.setting.deadline
//         }, {
//             where: { poll_id: pollId }
//         });

//         res.status(200).send({ code: 200, message: "i. O." });

//     } catch (error) {
//         console.log(error);
//         res.status(500).send({ code: 500, message: "Internal server error" });
//     }
// };

const updatePoll = async (req, res) => {
  const tokenValue = req.params.token;
  const pollBody = req.body;

  try {
    const token = await Token.findOne({
      where: { value: tokenValue, link: "admin" } 
    });

    if (!token) {
      res.status(404).send({ code: 404, message: "Poll not found." });
      return;
    }

    const pollId = token.poll_id;

    await Poll.update({
      title: pollBody.title,
      description: pollBody.description,
      fixed: pollBody.fixed
    }, {
      where: { id: pollId }
    });

    // Loop through each poll option in the request
    for (let option of pollBody.options) {
      // Check if the poll option already exists
      let existingOption = await Poll_option.findOne({ where: { id: option.id } });

      if (existingOption) {
        // Update the existing poll option
        await existingOption.update({ text: option.text });
      } else {
        // Create a new poll option
        await Poll_option.create({
          text: option.text,
          poll_id: pollId,
        });
      }
    }

    await Poll_setting.update({
      voices: pollBody.setting.voices,
      worst: pollBody.setting.worst,
      deadline: pollBody.setting.deadline
    }, {
      where: { poll_id: pollId }
    });

    res.status(200).send({ code: 200, message: "i. O." });

  } catch (error) {
    console.log(error);
    res.status(500).send({ code: 500, message: "Internal server error" });
  }
};


const deletePoll = async (req, res) => {
    const tokenValue = req.params.token;
  
    try {
      const token = await Token.findOne({
        where: {
          value: tokenValue,
          token_type: 'admin', //! muss noch ändern(nach token_type==admin suchen und nicht nach link==admin)
        },
      });
  
      if (!token) {
        return res.status(400).send({
          code: 400,
          message: 'Invalid poll admin token.',
        });
      }
  
      const pollId = token.poll_id;
  
      await Poll_option.destroy({ where: { poll_id: pollId } });
      await Poll_setting.destroy({ where: { poll_id: pollId } });
      await Token.destroy({ where: { poll_id: pollId } });
      await Vote.destroy({where: {poll_id: pollId}});
      await Poll.destroy({ where: { id: pollId } });
      // await Token.destroy({ where: { poll_id: pollId } });
      
  
      res.status(200).send({
        code: 200,
        message: 'i. O.',
      });
    } catch (error) {
      console.log(error);
      res.status(404).send({
        code: 404,
        message: 'Poll not found.',
      });
    }
  };

  const getPollStatistics = async (req, res) => {
    const tokenValue = req.params.token;
  
    try {
      const token = await Token.findOne({
        where: { value: tokenValue, token_type: "share" },
      });
  
      if (!token) {
        res.status(404).send({ code: 404, message: "Poll not found." });
        return;
      }
  
      const pollId = token.poll_id;
  
      const poll = await Poll.findOne({
        where: { id: pollId },
        include: [
          {
            model: db.polls_options,
            as: "options",
          },
          {
            model: db.polls_settings,
            as: "setting",
          },
        ],
      });
  
      // Fetch participants, options with their votes, and worst votes
      const participants = await db.users.findAll({
        where: {
          id: {
            [db.Sequelize.Op.in]: db.sequelize.literal(`(SELECT DISTINCT user_id FROM votes WHERE poll_id = ${pollId})`),
          },
        },
        raw: true,
      });
  
      const options = await db.polls_options.findAll({
        where: { poll_id: pollId },
        include: [
          {
            model: db.votes,
            as: "votes",
            where: { poll_id: pollId, worst: false },
            required: false,
            attributes: ["user_id"],
          },
          {
            model: db.votes,
            as: "worst_votes",
            where: { poll_id: pollId, worst: true },
            required: false,
            attributes: ["user_id"],
          },
        ],
      });
  
      const formattedOptions = options.map((option) => ({
        id: option.id,
        text: option.text,
        voted: option.votes.map((vote) => vote.user_id),
        worst: option.worst_votes.map((worstVote) => worstVote.user_id),
      }));
  
      res.status(200).send({
        poll: {
          body: {
            title: poll.title,
            description: poll.description,
            options: poll.options.map((option) => ({
              id: option.id,
              text: option.text,
            })),
            setting: poll.setting,
            fixed: poll.fixed, // Fetch the fixed options data from the poll
          },
          share: {
            link: "share",
            value: token.value,
          },
        },
        participants: participants.map((participant) => ({ name: participant.name })),
        options: formattedOptions,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ code: 500, message: "Internal server error" });
    }
  };

  const getPollList = async (req, res) => {
    try {
      const polls = await Poll.findAll({
        include: [
          {
            model: Poll_setting,
            as: 'setting',
          },
          {
            model: Poll_option,
            as: 'options',
          },
          {
            model: Token,
            as: 'tokens',
          },
        ],
      });
  
      const formattedPolls = polls.map(poll => ({
        poll: {
          body: {
            title: poll.title,
            description: poll.description,
            options: poll.options.map(option => ({
              id: option.id,
              text: option.text,
            })),
            setting: poll.setting,
            fixed: poll.fixed,
          },
          tokens: poll.tokens.map(token => ({
            link: token.link,
            value: token.value,
          })),
        },
      }));
  
      res.status(200).send(formattedPolls);
    } catch (error) {
      console.log(error);
      res.status(500).send({ code: 500, message: "Internal server error" });
    }
  };
  
  


module.exports = { addPoll, updatePoll, deletePoll, getPollStatistics, pollValidationRules, getPollList }