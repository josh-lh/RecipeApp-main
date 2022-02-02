import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import { recipesRouter } from "./src/router/recipes.router";
import { connectToDatabase } from "./src/services/database.service";

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupDatabase();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  setupDatabase() {
    connectToDatabase().catch((error: Error) => {
      console.error("Database connection failed", error);
      process.exit();
    });
  }

  listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
  }

  setupControllers() {
    console.log("setting up controllers");
    app.use("/recipes", recipesRouter);
  }
}

const application = new Application();

application.listen();
