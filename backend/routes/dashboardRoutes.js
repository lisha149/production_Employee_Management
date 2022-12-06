var express = require("express");
const { getDashboard } = require("../controllers/dashboardControllers");
const { isAuth } = require("../middleware/authMiddleware");
var router = express.Router();

router.route("/dashboard").get(isAuth, getDashboard);

module.exports = router;
