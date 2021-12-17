const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { Op } = require("sequelize");

let router = express.Router();

/**
 * FIX ME!
 *
 * @returns contract by id
 */
router.get("/:id", getProfile, async (req, res) => {
  const { Contract } = req.app.get("models");
  const { id } = req.params;
  const contractorId = req.profile.id;
  const contract = await Contract.findOne({
    where: { id, ContractorId: contractorId },
  });
  if (!contract) return res.status(404).end();
  res.json(contract);
});

router.get("/", getProfile, async (req, res) => {
  const { Contract } = req.app.get("models");
  const userId = req.profile.id;
  const contracts = await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
      status: {
        [Op.ne]: "terminated",
      },
    },
  });
  if (!contracts) return res.status(404).end();
  res.json(contracts);
});

module.exports = router;
