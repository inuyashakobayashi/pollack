module.exports = (sequelize, DataTypes) => {
    const Poll_option = sequelize.define("poll_option", {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    });
    return Poll_option;
  };
  