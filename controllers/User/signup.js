// controllers/User/signup.js

const User = require("../../models/User");
const saltFunction = require("../../validators/saltFunction.js");

const config = require("config");
const signupValidationSchema = require("../../validators/signupValidationSchema.js");

async function signup(req, res) {
  try {
    const { userName, email, password, role } = req.body;

    const { error } = signupValidationSchema.validate(req.body);

    if (error?.details?.length) {
      const errorMessages = error.details[0].message;
      return res.status(400).json({ message: errorMessages });
    }

    let isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res
        .status(400)
        .json({ hasError: true, message: "User already exists" });
    }

    const { hashedPassword, salt } = saltFunction.hashPassword(password);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
      role,
      salt,
    });

    delete user.password;
    delete user.salt;

    return res.status(200).json({
      hasError: false,
      message: "Signup successfully",
      data: {
        email: user.email,
        userName: user.userName,
        role: user.role,
        _id: user.id,
      },
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = signup;
