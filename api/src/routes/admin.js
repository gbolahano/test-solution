const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../model");
let router = express.Router();

router.get("/best-profession", getProfile, async (req, res) => {
  const bestProfession = await sequelize.query(
    "SELECT `profession`, MAX(`total`) total_money FROM (SELECT `profession`, sum(`price`) AS `total` FROM `Contracts` AS `Contract` LEFT OUTER JOIN `Profiles` AS `Contractor` ON `Contract`.`ContractorId` = `Contractor`.`id` INNER JOIN `Jobs` AS `Jobs` ON `Contract`.`id` = `Jobs`.`ContractId` AND `Jobs`.`paid` = 1 WHERE `Contract`.`status` != 'terminated' GROUP BY `profession`)",
    { type: QueryTypes.SELECT }
  );

  res.json(bestProfession);
});
router.get("/best-clients", getProfile, async (req, res) => {
  const bestClient = await sequelize.query(
    "SELECT `firstName`, `lastName`, paid FROM (SELECT `firstName`, `lastName`, sum(`price`) AS `paid` FROM `Contracts` AS `Contract` LEFT OUTER JOIN `Profiles` AS `Client` ON `Contract`.`ClientId` = `Client`.`id` INNER JOIN `Jobs` AS `Jobs` ON `Contract`.`id` = `Jobs`.`ContractId` AND `Jobs`.`paid` = 1 WHERE `Contract`.`status` != 'terminated' GROUP BY `Client`.`id`) ORDER BY `paid` DESC LIMIT :limit",
    { type: QueryTypes.SELECT, replacements: { limit: 2 } }
  );

  res.json(bestClient);
});

module.exports = router;
