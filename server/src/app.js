require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./dbConnector");

const app = express();
const port = 3001;
app.use(express.json());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (name && email && password) {
    const users = await db.getUserByEmail(email);
    if (users.length === 1) {
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
  const users = await db.getUserByEmail("Duncan_Koelpin@gmail.com");
  if (users.length === 1) {
  } else {
  }
  console.log(user);
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const users = await db.getUsersList();
  console.log(users);
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../client/build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
