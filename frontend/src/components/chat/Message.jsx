import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useContacts from "../../zustand/useContacts";

const Message = ({ msg, isEmpty = false }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedContact } = useContacts();

  if (isEmpty) {
    return (
      <div className="self-start text-center text-gray-400 mt-2">
        No messages yet. Start the conversation!
      </div>
    );
  }

  const isSentByMe = msg.senderId === authUser.username; // <-- CHANGED

  // Alignment
  const alignment = isSentByMe ? "chat-end" : "chat-start";

  // Bubble color
  const bubbleColor = isSentByMe
    ? "bg-blue-500 text-white"
    : "bg-gray-300 text-black";

  // Sender label
  const senderLabel = isSentByMe
    ? "You"
    : `${selectedContact.firstname} ${selectedContact.lastname}`;

  return (
    <div className={`chat ${alignment}`}>
      <div className="chat-header text-left mb-1">{senderLabel}</div>
      <div className={`chat-bubble ${bubbleColor}`}>{msg.message}</div>
      <time className="chat-footer text-[10px] text-left opacity-50 mt-1">
        {new Date(msg.timestamp).toLocaleTimeString()} {/* <-- CHANGED */}
      </time>
    </div>
  );
};

export default Message;
