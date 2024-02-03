//12

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt"); //12.1
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");

//@description register a user
//@route GET /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  //create hash password
  const hashedPassword = await bcrypt.hash(password, 10); //12.2
  console.log("hashedPassword: ", hashedPassword); //12.3
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log(`User Created: ${user}`); //12.4
  if (user) {
    res
      .status(201)
      .json({ _id: user.id, email: user.email, username: user.username });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
  //from here start to create JWT token install jsonwebtoken
});

//@description login a user
//@route GET /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res, next) => {
  //12.5
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }
  const user = await User.findOne({ email }); //12.6
  //compare password with hash password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET, //12.7 create env
      {
        expiresIn: "10m", // Set a longer expiration time, e.g., 1 hour
      }
    );

    // Send the access token in the response
    res.status(200).json({ accessToken });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

//@description current a user
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler((req, res, next) => {
  res.json(req.user);
});

//from here goes to 13 user model

module.exports = { registerUser, loginUser, currentUser };
