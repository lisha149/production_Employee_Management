const asyncHandler = require("express-async-handler");
var moment = require("moment");
const Models = require("./../models");
const Leave = Models.leaves;
const User = Models.users;
const { isAdmin, isAuth, isEmployee } = require("../middleware/authMiddleware");
const EmailSender = require("../config/sendEmail");
const leaveRejected = require("../config/sendEmailToEmployee/Rejected");
const leaveApproved = require("../config/sendEmailToEmployee/Approved");
//Apply Leave
const applyLeave = asyncHandler(async (req, res) => {
  let email = req.user.email;
  let reason = req.body.leave_reason;
  let start_date = req.body.start_date;
  let end_date = req.body.end_date;
  let user_id = req.user.id;
  let today = new Date();
  today = moment(today).format("YYYY-MM-DD");
  try {
    if (reason == "" || start_date == "" || end_date == "") {
      res.status(400).json({ message: "Fields cannot be empty" });
    } else if (start_date < today) {
      res.status(400).json({ message: "Please provide valid start date" });
    } else if (end_date < start_date) {
      res.status(400).json({ message: "Please provide valid end date" });
    } else {
      var leaveData = {
        email,
        user_id,
        reason,
        start_date,
        end_date,
      };
      const created_leave = await Leave.create(leaveData);
      EmailSender({
        email,
        reason,
        start_date,
        end_date,
      });
      if (created_leave) {
        res.status(201).json({
          id: created_leave.id,
          user_id: created_leave.user_id,
          email: req.user.email,
          reason: created_leave.reason,
          start_date: created_leave.start_date,
          end_date: created_leave.end_date,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//Get all leaves
const getAllLeaves = asyncHandler(async (req, res) => {
  const leaves = await Leave.findAll();
  const users = await User.findAll();
  try {
    let employeeLeaveData = [];
    users.forEach((user) => {
      userData = user.dataValues;
      leaves.forEach((leave) => {
        leaveData = leave.dataValues;
        if (userData.id == leaveData.user_id) {
          employeeLeaveData.push({
            id: leaveData.id,
            user_id: userData.id,
            applicant_name: userData.first_name + " " + userData.last_name,
            reason: leaveData.reason,
            start_date: leaveData.start_date,
            end_date: leaveData.end_date,
            rejected_reason: leaveData.rejected_reason,
            status: leaveData.status,
          });
        }
      });
    });
    if (leaves) {
      res.json(employeeLeaveData);
    } else {
      res.status(404).json({ message: "Leave not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Get all leaves
const getLeaveById = asyncHandler(async (req, res) => {
  const leave = await Leave.findByPk(req.params.id);
  try {
    if (leave) {
      res.json(leave);
    } else {
      res.status(404).json({ message: "Leave not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
//Approved/Reject leave
const approveRejectLeave = asyncHandler(async (req, res) => {
  const leave = await Leave.findByPk(req.params.id);
  req.leave = await User.findOne({ where: { id: leave.user_id } });
  // console.log(req.leave.email);
  const status = req.body.status;
  const rejected_reason = req.body.rejected_reason;
  const email = req.leave.email;
  try {
    if (leave) {
      leave.status = status;
      leave.rejected_reason = rejected_reason;
      if (leave.status == "Rejected" && leave.rejected_reason == "") {
        res.status(400).json({ message: "Please provide the rejected reason" });
      } else {
        const updatedLeave = await leave.save();
        res.json(updatedLeave);
      }
    } else {
      res.status(404).json({ message: "Leave not found" });
    } // console.log(email);
    if (leave.status.toLowerCase() === "approved") {
      leaveApproved({ email, status });
    } else {
      leaveRejected({ email, status, rejected_reason });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

//view own leave
const viewOwnLeave = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const leave = await Leave.findAll({ where: { user_id: user_id } });
  try {
    if (leave) {
      res.json(leave);
    } else {
      res.status(404).json({ message: "Leave not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = {
  applyLeave,
  getAllLeaves,
  getLeaveById,
  approveRejectLeave,
  viewOwnLeave,
};
