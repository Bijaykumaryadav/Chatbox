const User = require("../models/user");

// Controller function to get all users
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      message: "List of all users",
      users: users,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error in fetching users",
      error: err.message,
    });
  }
};
