/* eslint-disable no-console */
import configureContainer from "../container";
import "dotenv/config";


const { config, db, app } = configureContainer().cradle;
// Get the hostname and port to listen on
const hostname = config.hostname || "127.0.0.1";
const port = config.port || 3000;


db.sequelize.authenticate()
  .then(() => {
    app.listen(port, () => {
      console.log(`API is listening on ${hostname}:${port}`);
    });
    console.log("Connected to database successfully");
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });


process.on("SIGINT", () => {
  db.sequelize.close(); // properly close db connection
  console.log("Shutting down server...");
  console.log("Server successfully shutdown");
  process.exit(0);
});
