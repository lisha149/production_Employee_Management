const asyncHandler = require("express-async-handler");
const Models = require("./../models");
const Department = Models.departments;
const User = Models.users;
const Profile = Models.profiles;
const { isAuth, isAdmin } = require("../middleware/authMiddleware");

//Create
const createDepartment = asyncHandler(async (req, res) => {
  const title = req.body.title;
  try {
    if (title == "") {
      res.status(400).json({ message: "Department title cannot be empty" });
    } else {
      var dept = {
        title,
      };
      const created_department = await Department.create(dept);
      res.status(201).json(created_department);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//Get all departments
const getAllDepartments = asyncHandler(async (req, res) => {
  const departments = await Department.findAll();
  try {
    if (departments) {
      res.json(departments);
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Get department by id
const getDepartmentById = asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  try {
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Edit department
const editDepartment = asyncHandler(async (req, res) => {
  const { title } = req.body;
  try {
    if (title == "") {
      res.status(400).json({ message: "Department title cannot be empty" });
    } else {
      const department = await Department.findByPk(req.params.id);

      if (department) {
        department.title = title || department.title;
        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
      } else {
        res.status(404).json({ message: "Department not found" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Delete Department
const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  try {
    if (department) {
      await department.destroy();
      res.json({ message: "Department Deleted" });
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Get department members
const getDepartmentMembers = asyncHandler(async (req, res) => {
  const department = await Department.findByPk(req.params.id);
  const profiles = await Profile.findAll();
  try {
    let employeeProfileData = [];
    if (department) {
      const employees = await User.findAll({
        where: { department_id: department.id },
      });
      if (employees) {
        employees.forEach((employee) => {
          userData = employee.dataValues;
          profiles.forEach((profile) => {
            profileData = profile.dataValues;
            if (userData.id == profileData.user_id) {
              employeeProfileData.push({
                id: profileData.id,
                user_id: userData.id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                designation: userData.designation,
                address: profileData.address,
                contact_number: profileData.contact_number,
                dob: profileData.dob,
                profile_pic: profileData.profile_pic,
              });
            }
          });
        });
        res.json(employeeProfileData);
      } else {
        res.status(404).json({ message: "Employee not found" });
      }
    } else {
      res.status(404).json({ message: "Department not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  editDepartment,
  getDepartmentMembers,
  deleteDepartment,
};
