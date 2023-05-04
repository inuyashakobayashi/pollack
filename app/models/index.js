
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

// db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
// db.comments = require("./comment.model.js")(sequelize, Sequelize);

// db.tutorials.hasMany(db.comments, { as: "comments" });
// db.comments.belongsTo(db.tutorials, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });


db.tokens = require("./token.model.js")(sequelize, DataTypes);

db.polls = require("./poll.model.js")(sequelize, DataTypes);
db.polls_settings = require("./poll_setting.model.js")(sequelize, DataTypes);
db.polls_options = require("./poll_option.model.js")(sequelize, DataTypes);

// Define the relationships between the poll, poll_setting, and poll_option tables
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
