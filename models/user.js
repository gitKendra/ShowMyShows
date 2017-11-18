module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  User.associate = function(models) {

      User.belongsToMany(models.show, {
          through: {
              model: models.user_show,
              unique: false
          },
          foreignKey: 'showId',
          constraints: false
      });
  }
  return User;
};