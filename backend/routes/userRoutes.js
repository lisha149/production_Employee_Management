const express = require("express");
const {
  registerUser,
  authUser,
  viewEmployee,
  viewEmployeeById,
  deleteEmployee,
  myTeam,
} = require("../controllers/userControllers");
const { isAuth, isAdmin, isEmployee } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/login").post(authUser);
router.route("/employee").post(isAdmin, registerUser);
router.route("/employees").get(isAdmin, viewEmployee);
router.route("/employees/:id").get(isAuth, viewEmployeeById);
router.route("/employees/:id").delete(isAdmin, deleteEmployee);
router.route("/employee").get(isEmployee, myTeam);

module.exports = router;
