module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define("token", {
      link: {
        type: DataTypes.STRING,
      },
      value: {
        type: DataTypes.STRING
      },
      token_type: {
        type: DataTypes.STRING
      }
    }); 
    return Token;
  };