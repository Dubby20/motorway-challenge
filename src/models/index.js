const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

/**
 *@description Function to connect to Postgres
 *@param  {string} url
 *@returns {object} - new postgress connection
 */
const connectToDatabase = ({ credentials }) => {
  try {
    const basename = path.basename(__filename);
    const db = {};
    // eslint-disable-next-line max-len
    const sequelize = new Sequelize(
      credentials.database,
      credentials.username,
      credentials.password,
      {
        host: credentials.host,
        port: 5432,
        dialect: "postgres",
      }
    );

    fs.readdirSync(__dirname)
      .filter(
        (file) =>
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js"
      )
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(
          sequelize,
          Sequelize.DataTypes
        );
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
      });
    return db;
  } catch (error) {
    throw error;
  }
};

export default connectToDatabase;