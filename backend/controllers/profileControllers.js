const asyncHandler = require("express-async-handler");
const Models = require("../models");
const Profile = Models.profiles;
const User = Models.users;
var moment = require("moment");

//Edit profile
const editProfile = asyncHandler(async (req, res) => {
  var today = new Date();
  var validMinDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );
  validMinDate = moment(validMinDate).format("YYYY-MM-DD");
  const {
    address,
    contact_number,
    dob,
    citizenship_number,
    pan_number,
    bank_account,
    bank_account_number,
    gender,
    marital_status,
    profile_pic,
  } = req.body;
  let number = /^\d*$/.test(contact_number);

  try {
    if (number == false) {
      res.status(401).json({ message: "Contact number must be numeric" });
    } else if (dob > validMinDate) {
      res
        .status(401)
        .json({ message: "Minimum age is 16. Correct the date of birth" });
    } else {
      const profile = await Profile.findOne({
        where: { user_id: req.user.id },
      });
      if (profile) {
        (profile.contact_number = contact_number || profile.contact_number),
          (profile.address = address || profile.address),
          (profile.dob = dob || profile.dob),
          (profile.citizenship_number =
            citizenship_number || profile.citizenship_number),
          (profile.pan_number = pan_number || profile.pan_number),
          (profile.bank_account = bank_account || profile.bank_account),
          (profile.bank_account_number =
            bank_account_number || profile.bank_account_number),
          (profile.gender = gender || profile.gender),
          (profile.marital_status = marital_status || profile.marital_status),
          (profile.profile_pic = profile_pic || profile.profile_pic);
        const updatedProfile = await profile.save();

        res.json({
          id: updatedProfile.id,
          user_id: updatedProfile.user_id,
          address: updatedProfile.address,
          contact_number: updatedProfile.contact_number,
          dob: updatedProfile.dob,
          citizenship_number: updatedProfile.citizenship_number,
          pan_number: updatedProfile.pan_number,
          bank_account: updatedProfile.bank_account,
          bank_account_number: updatedProfile.bank_account_number,
          gender: updatedProfile.gender,
          marital_status: updatedProfile.marital_status,
          profile_pic: updatedProfile.profile_pic,
        });
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Edit profile by admin
const editProfileByAdmin = asyncHandler(async (req, res) => {
  var today = new Date();
  var validMinDate = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );
  validMinDate = moment(validMinDate).format("YYYY-MM-DD");
  const {
    first_name,
    last_name,
    designation,
    department_id,
    status,
    address,
    contact_number,
    dob,
    citizenship_number,
    pan_number,
    bank_account,
    bank_account_number,
    gender,
    marital_status,
    profile_pic,
  } = req.body;
  let number = /^\d*$/.test(contact_number);

  try {
    if (number == false) {
      res.status(401).json({ message: "Contact number must be numeric" });
    } else if (dob > validMinDate) {
      res
        .status(401)
        .json({ message: "Minimum age is 16. Correct the date of birth" });
    } else {
      const employee = await User.findByPk(req.params.id);
      const profile = await Profile.findOne({
        where: { user_id: employee.id },
      });
      if (employee && profile) {
        (employee.first_name = first_name || employee.first_name),
          (employee.last_name = last_name || employee.last_name),
          (employee.department_id = department_id || employee.department_id),
          (employee.designation = designation || employee.designation),
          (employee.status = status || employee.status),
          (profile.first_name = first_name || profile.first_name),
          (profile.last_name = last_name || profile.last_name),
          (profile.designation = designation || profile.designation);
        (profile.contact_number = contact_number || profile.contact_number),
          (profile.address = address || profile.address),
          (profile.dob = dob || profile.dob),
          (profile.citizenship_number =
            citizenship_number || profile.citizenship_number),
          (profile.pan_number = pan_number || profile.pan_number),
          (profile.bank_account = bank_account || profile.bank_account),
          (profile.bank_account_number =
            bank_account_number || profile.bank_account_number),
          (profile.gender = gender || profile.gender),
          (profile.marital_status = marital_status || profile.marital_status),
          (profile.profile_pic = profile_pic || profile.profile_pic);
        const updatedProfile = await profile.save();
        const updatedEmployee = await employee.save();
        res.status(200).json({
          updatedEmployee,
          updatedProfile,
        });
      } else {
        res.status(404).json({ message: "Profile not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Get profile by profile id
const getProfileById = asyncHandler(async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);
  const employee = await User.findOne({ where: { id: profile.user_id } });
  try {
    if (profile && employee) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Get profile by user id
const viewProfile = asyncHandler(async (req, res) => {
  const employee = await User.findByPk(req.params.id);
  const profile = await Profile.findOne({ where: { user_id: employee.id } });

  try {
    if (profile && employee) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//Get all profiles
const getAllProfiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.findAll();
  try {
    if (profiles) {
      res.json(profiles);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Get current user profile
const userProfile = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const profile = await Profile.findOne({ where: { user_id: user_id } });
  try {
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: "Profile not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = {
  editProfile,
  editProfileByAdmin,
  viewProfile,
  getAllProfiles,
  userProfile,
  getProfileById,
};
