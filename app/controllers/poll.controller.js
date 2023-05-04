const db = require("../models");
const Poll = db.polls;
const Poll_setting = db.polls_settings;
const Poll_option = db.polls_options;
const Token = db.tokens;
const crypto = require("crypto");

// Create and Save new Polls
const addPoll = async (req, res) => {

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
            poll_id: poll.id
        })

        const shareToken = await Token.create({
            link: "share",
            value: shareTokenValue,
            poll_id: poll.id
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
    }
};

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

        await Poll_option.destroy({ where: { poll_id: pollId } });
        const poll_options = pollBody.options.map(option => {
            return Poll_option.create({
                text: option.text,
                poll_id: pollId,
            });
        });

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
          link: 'admin',
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
      await Poll.destroy({ where: { id: pollId } });
      await Token.destroy({ where: { poll_id: pollId } });
  
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
  


module.exports = { addPoll, updatePoll, deletePoll }