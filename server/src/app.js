require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: process.env.SESSION_COOKIE_NAME
  })
);

app.use(routes);

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Login Demo",
      version: "1.0.0"
    }
  },
  apis: ["./src/routes.js"]
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../../client/build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
