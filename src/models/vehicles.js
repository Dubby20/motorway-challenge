module.exports = (sequelize, DataTypes) => {
  const vehicles = sequelize.define("vehicles", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    make: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    model: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
  // eslint-disable-next-line no-unused-vars
  vehicles.associate = (models) => {
    // associations can be defined here
  };
  return vehicles;
};
