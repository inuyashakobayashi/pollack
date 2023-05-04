module.exports = (sequelize, DataTypes) => {
    const Poll_setting = sequelize.define("poll_setting", {
    voices: {
        type: DataTypes.INTEGER,       
      },
      worst: {
        type: DataTypes.BOOLEAN,
      },
      deadline: {
        type: DataTypes.DATE,
      }
    });
    return Poll_setting;
  };