const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { Op } = require("sequelize");

let router = express.Router();

router.get("/deposit/:userId", getProfile, async (req, res) => {
  res.json({ message: null });
});

module.exports = router;
