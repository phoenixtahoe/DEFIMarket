const express = require("express");
const Favorites = require("../models/favorites");
const Coins = require("../models/coins");
const router = express.Router();

router.get("/:username", async function (req, res, next) {
    try {
      const coins = await Favorites.get(req.params.username);
      return res.json(coins);
    } catch (err) {
      return next(err);
    }
});

router.get("/", async function (req, res, next) {
  try {
    const coins = await Coins.getFavorites(req.query.ids)
    return res.json(coins.data)
  } catch (err) {
    return next(err)
  }
})

router.post("/:username/:id", async function (req, res, next) {
  try {
    const coin_id = req.params.id;
    await Favorites.add(req.params.username, coin_id);
    return res.json({ favorited: coin_id });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username/:id", async function (req, res, next) {
  try {
    await Favorites.remove(req.params.username, req.params.id);
    return res.json({ unfavorited: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router
