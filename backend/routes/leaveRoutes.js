const express = require("express");
const {
  applyLeave,
  getAllLeaves,
  approveRejectLeave,
  viewOwnLeave,
  getLeaveById,
} = require("../controllers/leaveControllers");
const { isAdmin, isEmployee } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/leave").post(isEmployee, applyLeave);
router.route("/leaves").get(isAdmin, getAllLeaves);
router.route("/leave/:id").get(isAdmin, getLeaveById);
router.route("/leave/:id").patch(isAdmin, approveRejectLeave);
router.route("/leave").get(isEmployee, viewOwnLeave);

module.exports = router;
