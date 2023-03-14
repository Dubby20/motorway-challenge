import {
  createContainer,
  asFunction,
  asValue,
  Lifetime,
  asClass,
} from "awilix";
import config from "./config/config";
import connectToDatabase from "./models";
import createApp from "./app";
import RedisClient from "./utils/Redis";

const configureContainer = () => {
  // Create IoC container for dependency injection
  const container = createContainer();
  const env = process.env.NODE_ENV ? process.env.NODE_ENV : "test";
  const credentials = config.db[env];

  // Register config in the container
  container.register({
    config: asValue(config),
    db: asFunction(connectToDatabase)
      .inject(() => ({ credentials }))
      .singleton(),
  });

  // Auto-register repositories, services, controllers and routes
  container.loadModules(
    [
      ["repositories/*.js", Lifetime.SCOPED],
      ["services/*.js", Lifetime.SCOPED],
      ["controllers/*.js", Lifetime.SCOPED],
      ["routes/*.js", Lifetime.SINGLETON],
    ],
    {
      cwd: __dirname,
      formatName: "camelCase",
    }
  );

  // Register the express application and server last (it will auto-mount routers)
  container.register({
    app: asFunction(createApp)
      .inject(() => ({ container }))
      .singleton(),
    redis: asClass(RedisClient)
      .inject(() => ({ container }))
      .singleton(),
  });
  return container;
};

export default configureContainer;
