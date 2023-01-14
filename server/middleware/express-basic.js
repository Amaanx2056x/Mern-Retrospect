let express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
let cors = require("cors");
let express_basic_setup = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    sessions({
      secret: process.env.SESSION_KEY,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 12 },
      resave: false,
    })
  );
  app.use(
    cors({
      origin: "http://localhost:3001",
      credentials: true,
    })
  );
};
module.exports = { express_basic_setup };
