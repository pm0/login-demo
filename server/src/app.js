require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const db = require("./dbConnector");
const encrypt = require("./encryptManager");

const app = express();
const port = 3001;
app.use(express.json());

const SESSION_COOKIE_NAME = "session_id";
app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: SESSION_COOKIE_NAME
  })
);

const authMiddleware = (req, res, next) => {
  if (req.cookies[SESSION_COOKIE_NAME] && req.session && req.session.user) {
    res.set("Cache-Control", "no-store");
    return next();
  } else {
    res.status(401);
    res.send({ sessionError: true });
  }
};

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const user = await db.getUserByEmail(email);
    if (user) {
      res.status(400);
      res.send({
        validationErrors: {
          email: "That email address has already been registered"
        }
      });
    } else {
      const response = await db.addUser(name, email, password);
      if (response.status === "error") {
        console.error("Error registering user: " + response.error);
        res.status(400);
        res.send({
          validationErrors: {
            form: "Sorry something went wrong, please try again"
          }
        });
      } else {
        res.status(200);
        res.send("ok");
      }
    }
  } else {
    console.error("Invalid registration form data");
    res.status(400);
    res.send({
      validationErrors: {
        form: "Sorry something went wrong, please try again"
      }
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await db.getUserByEmail(email);
    if (user) {
      const valid = encrypt.verifyPassword(password, user.password);
      if (valid) {
        req.session.user = user._id;
        res.status(200);
        res.send("ok");
      } else {
        res.status(400);
        res.send({
          validationErrors: {
            form: "Incorrect email or password"
          }
        });
      }
    } else {
      res.status(400);
      res.send({
        validationErrors: {
          form: "Incorrect email or password"
        }
      });
    }
  } else {
    console.error("Invalid login form data");
    res.status(400);
    res.send({
      validationErrors: {
        form: "Sorry something went wrong, please try again"
      }
    });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie(SESSION_COOKIE_NAME);
  req.session.destroy();
  res.status(200);
  res.send("ok");
});

app.get("/usersList", authMiddleware, async (req, res) => {
  const users = await db.getUsersList();
  res.send(users);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../client/build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
