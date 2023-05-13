// fixed_option.model.js
module.exports = (sequelize, DataTypes) => {
    const FixedOption = sequelize.define("fixed_option", {
      poll_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'polls', // 'polls' refers to table name
          key: 'id', 
        },
        allowNull: false,
      },
      option_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'poll_options', // 'poll_options' refers to table name
          key: 'id', 
        },
        allowNull: false,
      },
    }, {
      indexes: [
        // Unique constraint for pollId-optionId pair to avoid duplicates
        {
          unique: true,
          fields: ['poll_id', 'option_id']
        }
      ]
    });
  
    return FixedOption;
  };
  