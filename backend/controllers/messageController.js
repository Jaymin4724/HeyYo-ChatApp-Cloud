// import Conversation from "../models/conversationModel.js"; // <-- REMOVED
// import Message from "../models/messageModel.js"; // <-- REMOVED
import { io, getReceiverSocketId } from "../socket/socket.js";
import docClient from "../config/db.js"; // <-- ADDED
import { QueryCommand, PutCommand } from "@aws-sdk/lib-dynamodb"; // <-- ADDED

const getAllMessages = async (req, res) => {
  try {
    // const { id: userToChatId } = req.params; // <-- OLD
    // const senderId = req.user._id; // <-- OLD

    // NEW: We use usernames, not _ids
    const { id: otherUserUsername } = req.params; // <-- ADDED
    const senderUsername = req.user.username; // <-- ADDED

    // const conversation = await Conversation.findOne({ ... }); // <-- REMOVED

    // NEW: Create the conversationId by sorting usernames
    const conversationId = [senderUsername, otherUserUsername] // <-- ADDED
      .sort()
      .join("-");

    // NEW: Query the Messages table for all messages in this "conversation"
    const queryCmd = new QueryCommand({
      // <-- ADDED
      TableName: "Messages",
      KeyConditionExpression: "conversationId = :cid",
      ExpressionAttributeValues: {
        ":cid": conversationId,
      },
      ScanIndexForward: true, // Sort by 'timestamp' ASC (oldest to newest)
    });

    const { Items: messages } = await docClient.send(queryCmd); // <-- ADDED

    if (!messages) {
      return res.status(200).json([]);
    }

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getAllMessages controller:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    // const { id: receiverId } = req.params; // <-- OLD
    // const senderId = req.user._id; // <-- OLD

    // NEW: We use usernames
    const { id: receiverUsername } = req.params; // <-- ADDED
    const senderUsername = req.user.username; // <-- ADDED

    // let conversation = await Conversation.findOne({ ... }); // <-- REMOVED
    // if (!conversation) { ... } // <-- REMOVED
    // const newMessage = new Message({ ... }); // <-- REMOVED
    // if (newMessage) { ... } // <-- REMOVED
    // await Promise.all([conversation.save(), newMessage.save()]); // <-- REMOVED

    // NEW: Create the conversationId
    const conversationId = [senderUsername, receiverUsername] // <-- ADDED
      .sort()
      .join("-");

    // NEW: Create the message object for DynamoDB
    const newMessage = {
      // <-- ADDED
      conversationId: conversationId,
      timestamp: new Date().toISOString(), // Our Sort Key
      senderId: senderUsername,
      receiverId: receiverUsername,
      message: message,
    };

    // NEW: Save the message with a single PutCommand
    const putCmd = new PutCommand({
      // <-- ADDED
      TableName: "Messages",
      Item: newMessage,
    });
    await docClient.send(putCmd); // <-- ADDED

    // SOCKET IO FUNCTIONALITY
    // We pass the username to get the socket ID
    const receiverSocketId = getReceiverSocketId(receiverUsername); // <-- UPDATED
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage); // <-- UPDATED (simpler response)
  } catch (error) {
    console.error("Error in send message controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { sendMessage, getAllMessages };
