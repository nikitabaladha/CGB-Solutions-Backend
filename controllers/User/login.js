// controllers/login.js

const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const config = require("config");
const loginValidationSchema = require("../../Validators/loginValidationSchema.js");
const { jwtSecret, jwtExpiration } = require("../../config/local.json");
const saltFunction = require("../../validators/saltFunction");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const { error } = loginValidationSchema.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ hasError: true, message: "User does not exists" });
    }

    const isPasswordValid = await saltFunction.validatePassword(
      password,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ hasError: true, message: "Invalid Password" });
    }

    const payload = { id: user.id };

    const token = jwt.sign(
      {
        id: user.id,
        userName: user.userName,
        role: user.role,
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: jwtExpiration,
      }
    );

    return res.status(200).json({
      token,
      userDetails: {
        id: user.id,
        userName: user.userName,
        role: user.role,
        email: user.email,
      },
      hasError: false,
      message: "Login Successful",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = login;
