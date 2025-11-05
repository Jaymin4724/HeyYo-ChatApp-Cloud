import { LucideMessagesSquare } from "lucide-react";
import Messages from "./Messages";
import MessageSend from "./MessageSend";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext.jsx";
import useContacts from "../../zustand/useContacts";

const MessageContainer = ({
  messageText,
  setMessageText,
  handleMessageChange,
  color,
}) => {
  const [Color, UserColor] = useState(color);
  const { authUser } = useContext(AuthContext);
  const { onlineUsers } = useContext(SocketContext);
  const { selectedContact } = useContacts();
  const [isOnline, setIsOnline] = useState(false);

  // Set isOnline true if selectedContact.username is in onlineUsers
  useEffect(() => {
    if (selectedContact)
      setIsOnline(onlineUsers.includes(selectedContact.username)); // <-- CHANGED
  }, [onlineUsers, selectedContact]);

  if (!selectedContact) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center p-8 space-y-4">
        <h1 className="text-3xl font-bold">
          Welcome to{" "}
          <span className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
            HeyYo
          </span>
        </h1>
        <p className="text-lg text-base-content/70">
          Hello <b>{`${authUser.firstname} ${authUser.lastname}`}</b>
          , <br />
          Select a chat from the left to start messaging.
        </p>
        <div>
          <LucideMessagesSquare size={40} className="text-base-content/50" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-2 border-b border-base-300">
        <div className="flex items-center gap-4">
          <div
            className={`bg-white rounded-3xl p-[2.5px] avatar ${
              isOnline ? "avatar-online" : "avatar-offline"
            }`}
          >
            <div className="w-8 rounded-full overflow-hidden">
              <img
                src={selectedContact.profilePic}
                alt={`${selectedContact.firstname} ${selectedContact.lastname}`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base">
              {selectedContact.firstname} {selectedContact.lastname}
            </span>
            <span className="text-sm text-gray-500">
              @{selectedContact.username}
            </span>
          </div>
        </div>
      </div>
      <Messages currentUser={authUser.username} /> {/* <-- CHANGED */}
      <MessageSend
        messageText={messageText}
        setMessageText={setMessageText}
        handleMessageChange={handleMessageChange}
        color={Color}
      />
    </div>
  );
};

export default MessageContainer;
