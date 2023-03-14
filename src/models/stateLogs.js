module.exports = (sequelize, DataTypes) => {
  const stateLogs = sequelize.define("stateLogs", {
    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  // eslint-disable-next-line no-unused-vars
  stateLogs.associate = (models) => {
    // associations can be defined here
  };
  return stateLogs;
};
