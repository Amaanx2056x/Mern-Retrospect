const User = require("../model/User");
let bcrypt = require("bcryptjs");
const {
  checkReq,
  entityExistence,
  errorHandler,
} = require("../misc/common-helpers");
const jwt = require("jsonwebtoken");

authController = {
  login: async (req, res) => {
    try {
      checkReq(req, res);

      let { email, password } = req.body;
      let user = await entityExistence(req, res, User, "email", true);
      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({
            error: [
              {
                msg: "Invalid credentials!",
              },
            ],
          });
        }

        var payload = {
          user: {
            id: user.id,
          },
        };
        let token = jwt.sign(payload, process.env.SESSION_KEY, {
          expiresIn: 1000 * 60 * 60 * 12,
        });
        let session = req.session;
        session.token = token;
        await User.findOneAndUpdate(
          { email: user.email },
          { token },
          { new: true }
        );
        return res.status(200).send({ name: user.name, id: user.id });
      } else {
        throw new Error("User not Found");
      }
    } catch (err) {
      errorHandler(err, res);
    }
  },

  signup: async (req, res) => {
    try {
      checkReq(req, res);
      let { name, email, password } = req.body;
      await entityExistence(req, res, User, "email");
      const salt = await bcrypt.genSalt(10);
      let hashed = await bcrypt.hash(password, salt);
      const newUser = new User({
        name,
        email,
        password: hashed,
      });
      await newUser.save();
      return res.status(200).send(newUser);
    } catch (err) {
      errorHandler(err, res);
    }
  },

  logout: async (req, res) => {
    await User.findOneAndUpdate(
      { token: req.session.token },
      { token: null },
      {
        new: true,
      }
    );
    req.session.destroy();
    return res.status(200).send();
  },
};

module.exports = authController;
