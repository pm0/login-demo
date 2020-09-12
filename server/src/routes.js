const express = require("express");
const db = require("./dbConnector");
const encrypt = require("./encryptManager");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  if (
    req.cookies[process.env.SESSION_COOKIE_NAME] &&
    req.session &&
    req.session.user
  ) {
    res.set("Cache-Control", "no-store");
    return next();
  } else {
    res.status(401);
    res.send({ sessionError: true });
  }
};

/**
 * @swagger
 *
 * /register:
 *   post:
 *     summary: Register a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration successful
 *       400:
 *         description: Validation error (e.g. email already registered)
 */
router.post("/register", async (req, res) => {
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

/**
 * @swagger
 *
 * /login:
 *   post:
 *     summary: Log in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Log in successful
 *       400:
 *         description: Validation error (e.g. invalid email/password)
 */
router.post("/login", async (req, res) => {
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

/**
 * @swagger
 *
 * /login:
 *   get:
 *     summary: Log out user
 *     responses:
 *       200:
 *         description: Log out successful
 */
router.get("/logout", (req, res) => {
  res.clearCookie(process.env.SESSION_COOKIE_NAME);
  req.session.destroy();
  res.status(200);
  res.send("ok");
});

/**
 * @swagger
 *
 * /usersList:
 *   get:
 *     summary: Fetch list of all users
 *     responses:
 *       200:
 *         description: Request successful
 */
router.get("/usersList", authMiddleware, async (req, res) => {
  const users = await db.getUsersList();
  res.status(200);
  res.send(users);
});

module.exports = router;
