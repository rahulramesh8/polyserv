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
import oauthserver from "oauth2-server";

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

/*--------------------------------End of boilerplate setup-------------------------------------*/

// connect to db
initializeDb(db => {
  app.use(middleware({ config, db }));
  app.use("/api", api({ config, db }));

  app.server.listen(process.env.PORT || config.port, () => {
    console.log(`Started on port ${app.server.address().port}`);
  });
});

/*--------------------------------Setup oAuth2-------------------------------------*/

app.oauth = oauthserver({
  model: require("./models/facets"),
  grants: ["auth_code", "password"],
  debug: true
});

// Handle token grant requests
app.all("/oauth/token", app.oauth.grant());

// Show them the "do you authorise xyz app to access your content?" page
app.get("/oauth/authorise", (req, res, next) => {
  if (!req.session.user) {
    // If they aren't logged in, send them to your own login implementation
    return res.redirect(
      `/login?redirect=${req.path}&client_id=${
        req.query.client_id
      }&redirect_uri=${req.query.redirect_uri}`
    );
  }

  res.render("authorise", {
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Handle authorise
app.post(
  "/oauth/authorise",
  (req, res, next) => {
    if (!req.session.user) {
      return res.redirect(
        `/login?client_id=${req.query.client_id}&redirect_uri=${
          req.query.redirect_uri
        }`
      );
    }

    next();
  },
  app.oauth.authCodeGrant((req, next) => {
    // The first param should to indicate an error
    // The second param should a bool to indicate if the user did authorise the app
    // The third param should for the user/uid (only used for passing to saveAuthCode)
    next(null, req.body.allow === "yes", req.session.user.id, req.session.user);
  })
);

// Show login
app.get("/login", (req, res, next) => {
  res.render("login", {
    redirect: req.query.redirect,
    client_id: req.query.client_id,
    redirect_uri: req.query.redirect_uri
  });
});

// Handle login
app.post("/login", (req, res, next) => {
  // Insert your own login mechanism
  if (req.body.email !== "thom@nightworld.com") {
    res.render("login", {
      redirect: req.body.redirect,
      client_id: req.body.client_id,
      redirect_uri: req.body.redirect_uri
    });
  } else {
    // Successful logins should send the user back to the /oauth/authorise
    // with the client_id and redirect_uri (you could store these in the session)
    return res.redirect(
      `${req.body.redirect || "/home"}?client_id=${
        req.body.client_id
      }&redirect_uri=${req.body.redirect_uri}`
    );
  }
});

app.get("/secret", app.oauth.authorise(), (req, res) => {
  // Will require a valid access_token
  res.send("Secret area");
});

app.get("/public", (req, res) => {
  // Does not require an access_token
  res.send("Public area");
});

// Error handling
app.use(app.oauth.errorHandler());

export default app;
