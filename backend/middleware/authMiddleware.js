import jwt from "jsonwebtoken";
// import User from "../models/userModel.js"; // <-- REMOVED
import docClient from "../config/db.js"; // <-- ADDED
import { GetCommand } from "@aws-sdk/lib-dynamodb"; // <-- ADDED

// Middleware to protect routes
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }

    // --- LOGIC UPDATED FOR DYNAMODB ---

    // 1. Get username from the token (set by generateToken.js)
    const username = decoded.username;
    if (!username) {
      return res
        .status(401)
        .json({ message: "Unauthorized, invalid token payload" });
    }

    // 2. Find the user in DynamoDB using GetCommand
    const getCmd = new GetCommand({
      TableName: "Users",
      Key: { username: username }, // Query by our partition key
    });

    const { Item: user } = await docClient.send(getCmd);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized, user not found" });
    }

    // 3. Attach the user to the request object (excluding password)
    delete user.password;
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in authMiddleware", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default authMiddleware;
