const asyncHandler = require("express-async-handler");
const emailvalidator = require("email-validator");
const Models = require("../models");
const bcrypt = require("bcrypt");
const User = Models.users;
const Profile = Models.profiles;
const generateToken = require("../utils/generateToken");

const authUser = asyncHandler(async (req, res) => {
  try {
    if (req.body.email == "" || req.body.password == "") {
      res
        .status(400)
        .json({ message: "Email address or password cannot be empty" });
    } else {
      const user = await User.findOne({
        where: { email: req.body.email },
      });

      if (user) {
        const password = req.body.password;
        const password_valid = await bcrypt.compare(password, user.password);
        const profile = await Profile.findOne({
          where: { user_id: user.id },
        });
        if (password_valid && profile) {
          res.status(200).json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            is_admin: user.is_admin,
            designation: user.designation,
            department_id: user.department_id,
            joined_date: profile.joined_date,
            profile_pic: profile.profile_pic,
            token: generateToken(user.id),
          });
        } else {
          res.status(400).json({ message: "Password Incorrect" });
        }
      } else {
        res.status(404).json({ message: "User does not exist" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({
    where: { email: req.body.email },
  });

  try {
    if (userExists) {
      res.status(404).json({ message: "User already exits" });
    }

    const salt = await bcrypt.genSalt(10);
    var usr = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      is_admin: req.body.is_admin,
      designation: req.body.designation,
      department_id: req.body.department_id,
    };
    if (emailvalidator.validate(usr.email)) {
      created_user = await User.create(usr);
      const created_profile = await Profile.create({
        user_id: created_user.id,
        first_name: created_user.first_name,
        last_name: created_user.last_name,
        email: created_user.email,
        designation: created_user.designation,
      });
      if (created_user) {
        res.status(201).json({
          id: created_user.id,
          first_name: created_user.first_name,
          last_name: created_user.last_name,
          email: created_user.email,
          designation: created_user.designation,
          department_id: created_user.department_id,
          token: generateToken(created_user.id),
        });
      }
    } else {
      res.status(400).send({ message: "Please provide valid email" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const viewEmployee = asyncHandler(async (req, res) => {
  try {
    const employees = await User.findAll();
    res.json(employees);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const viewEmployeeById = asyncHandler(async (req, res) => {
  const employee = await User.findByPk(req.params.id);
  try {
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await User.findByPk(req.params.id);
  const profile = await Profile.findOne({
    where: { user_id: req.params.id },
  });
  try {
    if (employee && profile) {
      await profile.destroy();
      await employee.destroy();
      res.json({ message: "Employee Deleted" });
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
const myTeam = asyncHandler(async (req, res) => {
  try {
    const myteam = await User.findAll({
      where: { department_id: req.user.department_id },
    });
    res.json(myteam);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = {
  registerUser,
  authUser,
  viewEmployee,
  viewEmployeeById,
  deleteEmployee,
  myTeam,
};
