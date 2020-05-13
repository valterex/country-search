const express = require("express");
const fetch = require("node-fetch");
const sortCountries = require("./utils/userAndCountries");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/countries", (req, res) => {
  sortCountries().then((data) => res.send(data));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
