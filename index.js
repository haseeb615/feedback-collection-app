const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send({
    hi: "haseeb"
  });
});

const PORT = process.env.PROD || 5000;

app.listen(PORT);