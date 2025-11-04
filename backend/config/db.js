// import mongoose from "mongoose";

// const ConnectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//   }
// };

// export default ConnectDB;

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Set the AWS Region.
const REGION = "ap-south-1"; // <-- IMPORTANT: Change this to your AWS region

const dbClient = new DynamoDBClient({ region: REGION });

/*
 * This is the "Document Client". It's the one we'll use for all our
 * database operations because it simplifies working with JSON.
 *
 * HOW IT WORKS (Important!):
 * 1. When running on your local machine (like now), the SDK will
 * automatically find the credentials you set up with `aws configure` in Phase 1.
 * 2. Later, when we deploy to EC2, it will automatically find the
 * IAM Role we attach to the server.
 *
 * You will NEVER hard-code AWS keys in your code.
 */
const docClient = DynamoDBDocumentClient.from(dbClient);

export default docClient; // We will import this in our controllers
