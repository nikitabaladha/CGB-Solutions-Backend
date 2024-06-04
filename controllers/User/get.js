// controllers/User/getAllUsers.js
const User = require("../../models/User");

async function get(req, res) {
  try {
    const role = req.user.role;

    if (role !== "admin") {
      return res.status(403).json({
        hasError: true,
        message: "Only Admin is allowed to get all users.",
      });
    }

    const users = await User.find();

    return res.status(200).json({
      hasError: false,
      message: "All users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error(error.message);

    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = get;
