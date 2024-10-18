const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user.models");
const catchAsync = require("../utils/catch-async");

// Register a new user
exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the new user
  const newUser = new User({
    username: name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

// User login
exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // Create a JWT token
  const token = jwt.sign(
    { userId: user._id, name: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({ token });
});
