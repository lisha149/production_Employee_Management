const express = require("express");
const {
  editProfile,
  editProfileByAdmin,
  viewProfile,
  getAllProfiles,
  userProfile,
  getProfileById,
} = require("../controllers/profileControllers");
const { isAuth, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/profile").patch(editProfile);
router.route("/profile/:id").patch(isAdmin, editProfileByAdmin);
router.route("/profiles/:id").get(isAuth, viewProfile);
router.route("/profile/:id").get(isAuth, getProfileById);
router.route("/profiles").get(isAuth, getAllProfiles);
router.route("/profile").get(isAuth, userProfile);

module.exports = router;
