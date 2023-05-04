module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("vote", {
    worst: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    poll_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'polls',
        key: 'id'
      }
    },
    poll_option_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'poll_options',
        key: 'id'
      }
    },
  });
  return Vote;
};
