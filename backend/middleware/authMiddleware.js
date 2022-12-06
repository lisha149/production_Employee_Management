const jwt = require("jsonwebtoken");
const Models = require("../models");
const User = Models.users;
require("dotenv").config();

//protect our api
const isAuth = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded.id);
      req.user = await User.findOne({ where: { id: decoded.id } });
      // console.log(req.user.email);
      // console.log(req.user.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

//isadmin
const isAdmin = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        let user = await User.findOne({
          where: { id: decoded.id, is_admin: true },
        });
        console.log(user);
        if (!user) {
          return res
            .status(401)
            .send({ message: "You are not authorize to perform this action" });
        }
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

//isEmployee
const isEmployee = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //decodes token id
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded) {
        req.user = await User.findOne({
          where: { id: decoded.id, is_admin: false },
        });
        console.log(req.user);
        if (!req.user) {
          return res.status(401).send({
            message: " You are not authorize to perform this action",
          });
        }
        next();
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = { isAuth, isAdmin, isEmployee };
