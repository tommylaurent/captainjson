const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const axios = require("axios");

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("view engine", "pug")
  .set("views", path.join(__dirname, "views"))

  .get("/", (req, res) => {
    axios
      .get("https://cdn.rawgit.com/akabab/superhero-api/0.2.0/api/all.json")
      .then(response => {
        res.render("index", { persos: response.data });
      });
  })
  .get("/personnage:id(\\d+)", (req, res) => {
    axios
      .get(
        `https://raw.githubusercontent.com/akabab/superhero-api/0.2.0/api/id/${
          req.params.id
        }.json`
      )
      .then(response => {
        res.render("personnage", {
          perso: response.data
        });
      });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
