
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

// Define the relationships between users and votes with each other and others
db.users.hasMany(db.votes, { as: 'votes' });
db.votes.belongsTo(db.users, {
  foreignKey: 'user_id',
  as: 'user'
});

db.polls.hasMany(db.votes, { as: 'votes' });
db.votes.belongsTo(db.polls, {
  foreignKey: 'poll_id',
  as: 'poll'
});

db.polls_options.hasMany(db.votes, { as: 'votes' });
db.votes.belongsTo(db.polls_options, {
  foreignKey: 'poll_option_id',
  as: 'poll_option'
});

db.polls.hasMany(db.tokens, {as: 'tokens'});
db.tokens.belongsTo(db.polls, {
  foreignKey: 'poll_id',
  as: 'poll'
});

db.polls.hasOne(db.polls_settings, { as: 'setting' });
db.polls_settings.belongsTo(db.polls, { 
  foreignKey: 'poll_id',
   as: 'poll' });

db.polls.hasMany(db.polls_options, { as: 'options' });
db.polls_options.belongsTo(db.polls, { 
  foreignKey: 'poll_id',
   as: 'poll' });

db.sequelize.sync({force: false})
.then(()=>{
  console.log("yes re-sync is done!");
})

module.exports = db;
