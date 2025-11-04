// import User from "../models/userModel.js"; // <-- REMOVED
import docClient from "../config/db.js"; // <-- ADDED
import { ScanCommand } from "@aws-sdk/lib-dynamodb"; // <-- ADDED

const getAllUsers = async (req, res) => {
  try {
    // current logged in user (from authMiddleware)
    const loggedInUsername = req.user.username; // <-- CHANGED from _id

    // const allUsers = await User.find({ _id: { $ne: userId } }).select( // <-- REMOVED
    //   "-password"
    // );

    // Use Scan to get all items from the Users table
    const scanCmd = new ScanCommand({
      // <-- ADDED
      TableName: "Users",
      // Filter out the logged-in user
      FilterExpression: "username <> :uid",
      // Select only the fields we want (removes password)
      ProjectionExpression: "username, firstname, lastname, gender, profilePic",
      ExpressionAttributeValues: {
        ":uid": loggedInUsername,
      },
    });

    const { Items: allUsers } = await docClient.send(scanCmd); // <-- ADDED

    if (!allUsers) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error in get all user controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllUsers };
