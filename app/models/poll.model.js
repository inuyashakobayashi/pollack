module.exports = (sequelize, DataTypes) => {
    const Poll = sequelize.define("poll", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      description: {
        type: DataTypes.STRING
      }
    });
    return Poll;
  };
  
