import { config as envConfig } from "dotenv";
import "babel-polyfill";
import http from "http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import initializeDb from "./db";
import middleware from "./middleware";
import api from "./api";
import config from "./config.json";

const initApp = async () => {
  envConfig();

  let app = express();
  app.server = http.createServer(app);

  // logger
  app.use(morgan("dev"));

  // 3rd party middleware
  app.use(
    cors({
      exposedHeaders: config.corsHeaders
    })
  );

  app.use(
    bodyParser.json({
      limit: config.bodyLimit
    })
  );

  try {
    const db = await initializeDb();

    // internal middleware
    app.use(middleware({ config, db }));

    // api router
    app.use("/api", api({ config, db }));

    app.server.listen(process.env.PORT || config.port, () => {
      console.log(`Started on port ${app.server.address().port}`);
    });
  } catch (error) {
    console.error(error);
  }

  return app;
};

export default initApp();
