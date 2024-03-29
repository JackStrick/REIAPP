const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc Create User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
	const fname = req.body.fname.trim();
	const lname = req.body.lname.trim();
	const email = req.body.email.trim();
	const password = req.body.password.trim();
	const phone = req.body.phone.trim();

	if (!fname || !lname || !email || !password) {
		throw new Error("Please add all fields");
	}

	//Check if user exists
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User already exists with that email");
	}

	// Hash pass
	const salt = await bcrypt.genSalt(10);
	const hashedPass = await bcrypt.hash(password, salt);

	//Create user
	const user = await User.create({
		fname,
		lname,
		email,
		phone,
		password: hashedPass,
	});

	if (user) {
		res.status(201).json({
			_id: user.id,
			fname: user.fname,
			lname: user.lname,
			phone: user.phone,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid user data");
	}
});

// @desc Authenticate User Login
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
	const email = req.body.email.trim();
	const password = req.body.password.trim();

	if (!email || !password) {
		throw new Error("Please add all fields");
	}

	// Check user exists
	const user = await User.findOne({ email });

	if (user && (await bcrypt.compare(password, user.password))) {
		res.json({
			_id: user.id,
			fname: user.fname,
			lname: user.lname,
			email: user.email,
			phone: user.phone,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid credentials");
	}
});

// @desc User Logout
// @route GET /api/users/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
	if (req.session.user) {
		req.session.user = undefined;
	}

	res.status(201);
});

// @desc Get User Data
// @route GET /api/users/me
// @access Private
const getUser = asyncHandler(async (req, res) => {
	res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
};

module.exports = {
	registerUser,
	loginUser,
	logout,
	getUser,
};
