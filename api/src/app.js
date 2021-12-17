const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./model");
const cors = require("cors");

const contractsRoutes = require("./routes/contracts");
const jobsRoutes = require("./routes/jobs");
const balancesRoutes = require("./routes/balances");
const adminRoutes = require("./routes/admin");
const { getProfile } = require("./middleware/getProfile");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.use("/profile", getProfile, (req, res) => {
  const currentUser = req.profile;
  res.json({ currentUser });
});
app.use("/contracts", contractsRoutes);
app.use("/jobs", jobsRoutes);
app.use("/balances", balancesRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
