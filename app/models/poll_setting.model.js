module.exports = (sequelize, DataTypes) => {
    const Poll_setting = sequelize.define("poll_setting", {
    voices: {
        type: DataTypes.INTEGER,
        
      },
      worst: {
        type: DataTypes.BOOLEAN,
      },
      deadline: {
        type: DataTypes.DATE, //Muss kontrollieren
      }
    });
  
    return Poll_setting;
  };