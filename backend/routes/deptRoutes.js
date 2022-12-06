const express = require("express");
const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  editDepartment,
  getDepartmentMembers,
  deleteDepartment,
} = require("../controllers/deptControllers");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/department").post(isAdmin, createDepartment);
router.route("/department").get(isAuth, getAllDepartments);
router.route("/department/:id").get(isAuth, getDepartmentById);
router.route("/department/:id").put(isAdmin, editDepartment);
router.route("/department/:id").delete(isAdmin, deleteDepartment);
router.route("/departments/:id").get(isAuth, getDepartmentMembers);

module.exports = router;
