const express = require("express");
const app = express();
const port = 3001;

app.post("/", (req, res) => {
  res.send("Hello World!");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
