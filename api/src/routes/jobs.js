const express = require("express");
const { getProfile } = require("../middleware/getProfile");
const { Op } = require("sequelize");

const { sequelize } = require("../model");

let router = express.Router();

router.get("/unpaid", getProfile, async (req, res) => {
  const { Job, Contract } = req.app.get("models");
  const userId = req.profile.id;

  const jobs = await Job.findAll({
    where: {
      paid: {
        [Op.eq]: null,
      },
    },
    include: {
      model: Contract,
      where: {
        [Op.or]: [{ ClientId: userId }, { ContractorId: userId }],
        status: {
          [Op.eq]: "in_progress",
        },
      },
      attributes: [],
    },
  });

  if (!jobs) return res.status(404).end();
  res.json(jobs);
});

router.get("/:job_id/pay", getProfile, async (req, res) => {
  const { Contract, Job, Profile } = req.app.get("models");
  const jobId = req.params.job_id;
  const clientId = req.profile.id;

  const client = await Profile.findOne({ where: { id: clientId } });

  const job = await Job.findOne({
    where: {
      id: jobId,
    },
    include: {
      model: Contract,
      where: {
        ClientId: {
          [Op.eq]: clientId,
        },
      },
      // attributes: [],
    },
  });
  if (!job) return res.status(404).end();

  if (job.paid === true) {
    return res
      .status(200)
      .json({ message: "you have paid for this job" })
      .end();
  }

  const contractorId = job.Contract.ContractorId;

  if (client.balance >= job.price) {
    const contractor = await Profile.findOne({ where: { id: contractorId } });
    const clientNewBalance = client.balance - job.price;
    const contractorNewBalance = contractor.balance + job.price;

    const transaction = await sequelize.transaction();
    try {
      await Promise.all([
        await Profile.update(
          { balance: clientNewBalance },
          { where: { id: clientId } },
          {
            transaction: transaction,
          }
        ),
        await Profile.update(
          {
            balance: contractorNewBalance,
          },
          {
            where: {
              id: contractor.id,
            },
          },
          { transaction: transaction }
        ),
        await Job.update(
          {
            paid: true,
          },
          {
            where: {
              id: jobId,
            },
          },
          { transaction: transaction }
        ),
      ]);

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
    res.status(200).end();
  } else {
    return res.status(422).json({ message: "insufficient funds" }).end();
  }
});

module.exports = router;
