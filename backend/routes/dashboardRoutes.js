const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { getDashboardSummary } = require("../controllers/dashboardController");

const router = express.Router();

router.get("/", protect, adminOnly, getDashboardSummary);

module.exports = router;
