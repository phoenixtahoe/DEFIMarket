const express = require("express");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");
const Coins = require("../models/coins");
const router = express.Router();

router.get("/", async function (req, res, next) {
    try {
      const coins = await Coins.getAll();
      return res.json(coins.data);
    } catch (err) {
      return next(err);
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const coin = await Coins.get(req.params.id);
        return res.json(coin.data)
    } catch (err) {
        return next(err);
    }
});

module.exports = router
