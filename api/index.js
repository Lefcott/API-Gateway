const app = require("express")();

app.get("/:path", (req, res) => {
  res.json({ message: "it works!" });
});

module.exports = app;
