module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define("vote", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
  
    return Vote;
  };