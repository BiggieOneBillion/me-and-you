const jwt = require("jsonwebtoken");
const User = require("../model/user.models");

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the request header
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Verify the token and extract the user data
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the authenticated user to the request object
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
