import express from "express";
import { listModules } from "awilix";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

const createApp = ({ container }) => {
  const app = express();
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Motorway challenge" });
  });
  app.enable("trust proxy");

  // Enable Cross Origin Resource Sharing to all origins
  app.use(cors());

  // Log requests to the console.
  app.use(morgan("dev"));

  // Parse incoming requests data
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  const registrations = listModules("routes/*.js", { cwd: __dirname }).map(
    (registration) => ({
      name: registration.name,
      router: container.resolve(registration.name),
    })
  );

  // Mount all routers within API router
  registrations.forEach((eachRegistration) => {
    const { name, router } = eachRegistration;
    app.use(`/${name}`, router);
    console.log(`Mounted ${name} to /${name}`);
  });

  app.use((error, req, res, next) => {
    if (error.statusCode && error.extraAttributes) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
        ...error.extraAttributes,
      });
    }
    res.status(500).json({
      message: "Something went wrong",
      status: "error",
    });
  });

  // error handlers
  app.use("*", (req, res) => {
    res.status(404).json({
      message: "Path not found",
    });
  });

  return app;
};

export default createApp;
