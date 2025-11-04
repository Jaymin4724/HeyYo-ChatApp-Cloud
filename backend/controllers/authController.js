import bcrypt from "bcryptjs";
// import User from "../models/userModel.js"; // <-- REMOVED
import generateToken from "../utils/generateToken.js";
import docClient from "../config/db.js"; // <-- ADDED
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb"; // <-- ADDED

export const Signup = async (req, res) => {
  try {
    const { firstname, lastname, username, password, gender } = req.body;

    // VALIDATE INPUTS
    if (!firstname || !lastname || !username || !password || !gender) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // CHECK IF USER EXISTS
    // const user = await User.findOne({ username }); // <-- REMOVED
    const getCmd = new GetCommand({ // <-- ADDED
      TableName: "Users",
      Key: { username: username },
    });
    const { Item: user } = await docClient.send(getCmd); // <-- ADDED

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a random profile picture URL
    const profilePic =
      gender === "male"
        ? `https://avatar.iran.liara.run/public/boy?username=${username}`
        : gender === "female"
        ? `https://avatar.iran.liara.run/public/girl?username=${username}`
        : `https://avatar.iran.liara.run/username?username=${firstname}+${lastname}`;

    // Create a plain JS object, not a Mongoose model
    // const newUser = new User({ ... }); // <-- REMOVED
    const newUser = { // <-- ADDED
      firstname,
      lastname,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    };

    // if (newUser) { // <-- REMOVED
      // Generate JWT Token
      // generateToken(newUser, res); // <-- ORIGINAL
      generateToken(res, newUser.username); // <-- FIXED to match new generateToken.js

      // Save user to the database
      // await newUser.save(); // <-- REMOVED
      const putCmd = new PutCommand({ // <-- ADDED
        TableName: "Users",
        Item: newUser,
      });
      await docClient.send(putCmd); // <-- ADDED

      // Create response object (don't send password)
      const userResponse = {
        username: newUser.username,
        firstname: newUser.firstname,
        lastname: newUser.lastname,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      };

      return res.status(201).json({
        message: "User created successfully",
        user: userResponse, // <-- UPDATED
      });
    // } else { // <-- REMOVED
    //   return res.status(400).json({ message: "User not created" });
    // }

  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // VALIDATE INPUTS
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // const user = await User.findOne({ username }); // <-- REMOVED
    const getCmd = new GetCommand({ // <-- ADDED
      TableName: "Users",
      Key: { username: username },
    });
    const { Item: user } = await docClient.send(getCmd); // <-- ADDED

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    // const token = generateToken(user, res); // <-- ORIGINAL
    const token = generateToken(res, user.username); // <-- FIXED

    // Create response object (don't send password)
    const userResponse = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        gender: user.gender,
        profilePic: user.profilePic,
    };

    return res.status(200).json({
      message: "Login successful",
      user: userResponse, // <-- UPDATED
      token: token,
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};