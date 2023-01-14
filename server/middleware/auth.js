const { errorHandler } = require("../misc/common-helpers");
const User = require("../model/User");
let jwt = require("jsonwebtoken");

let authenticateUser = async (req, res, next) => {
  try {
    if (req.session.token) {
      let user = await User.findOne({ token: req.session.token }).select(
        "-password"
      );
      if (user) {
        const decoded = jwt.verify(req.session.token, process.env.SESSION_KEY);
        if (decoded.user.id === user.id) {
          req.user = user;
          next();
        }
      } else throw new Error("User is not Authenticated");
    } else throw new Error("User is not Authenticated");
  } catch (err) {
    errorHandler(err, res);
  }
};
module.exports = authenticateUser;
