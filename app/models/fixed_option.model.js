module.exports = (sequelize, DataTypes) => {
  const Fixed_option = sequelize.define("fixed_option", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  });

  return Fixed_option;
};

  