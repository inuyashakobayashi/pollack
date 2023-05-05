
const dbConfig = require("../config/db.config.js");

const {Sequelize, DataTypes} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize.authenticate()
.then(()=>{
  console.log("connected...")
})
.catch((error)=>{
  console.log("Error: " + error);
})
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.tokens = require("./token.model.js")(sequelize, DataTypes);
db.users = require("./user.model.js")(sequelize, DataTypes);
db.votes = require("./vote.model.js")(sequelize, DataTypes);
db.polls = require("./poll.model.js")(sequelize, DataTypes);
db.polls_settings = require("./poll_setting.model.js")(sequelize, DataTypes);
db.polls_options = require("./poll_option.model.js")(sequelize, DataTypes);

// // Polls
// db.polls.hasOne(db.polls_settings, { foreignKey: 'poll_id' , as: "setting"});
// db.polls.hasMany(db.polls_options, { foreignKey: 'poll_id' ,as: "options"});
// db.polls.hasMany(db.tokens, { foreignKey: 'poll_id' });
// db.polls.hasMany(db.votes, { foreignKey: 'poll_id' });

// // Poll_settings
// db.polls_settings.belongsTo(db.polls, { foreignKey: 'poll_id'});

// // Poll_options
// db.polls_options.belongsTo(db.polls, { foreignKey: 'poll_id' });
// db.polls_options.hasMany(db.votes, { foreignKey: 'poll_option_id' });

// // Tokens
// db.tokens.belongsTo(db.polls, { foreignKey: 'poll_id' });
// db.tokens.belongsTo(db.users, { foreignKey: 'user_id' });

// // Votes
// db.votes.belongsTo(db.users, { foreignKey: 'user_id' });
// db.votes.belongsTo(db.polls, { foreignKey: 'poll_id' });
// db.votes.belongsTo(db.polls_options, { foreignKey: 'poll_option_id' });

// // Users
// db.users.hasMany(db.votes, { foreignKey: 'user_id' });
// db.users.hasMany(db.tokens, { foreignKey: 'user_id' });

// Polls
db.polls.hasOne(db.polls_settings, { foreignKey: 'poll_id', as: "setting" });
db.polls.hasMany(db.polls_options, { foreignKey: 'poll_id', as: "options" });
db.polls.hasMany(db.tokens, { foreignKey: 'poll_id' });
db.polls.hasMany(db.votes, { foreignKey: 'poll_id' });

// Poll_settings
db.polls_settings.belongsTo(db.polls, { foreignKey: 'poll_id' });

// Poll_options
db.polls_options.belongsTo(db.polls, { foreignKey: 'poll_id' });
db.polls_options.hasMany(db.votes, { foreignKey: 'poll_option_id', as: 'votes' });
db.polls_options.hasMany(db.votes, { foreignKey: 'poll_option_id', as: 'worst_votes' });

// Tokens
db.tokens.belongsTo(db.polls, { foreignKey: 'poll_id' });
db.tokens.belongsTo(db.users, { foreignKey: 'user_id' });

// Votes
db.votes.belongsTo(db.users, { foreignKey: 'user_id' });
db.votes.belongsTo(db.polls, { foreignKey: 'poll_id' });
db.votes.belongsTo(db.polls_options, { foreignKey: 'poll_option_id' });

// Users
db.users.hasMany(db.votes, { foreignKey: 'user_id' });
db.users.hasMany(db.tokens, { foreignKey: 'user_id' });
// ...

db.sequelize.sync({force: false})
.then(()=>{
  console.log("yes re-sync is done!");
})

module.exports = db;
