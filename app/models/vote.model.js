module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define("vote", {
    worst: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Vote;
};
