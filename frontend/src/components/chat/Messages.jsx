import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import useContacts from "../../zustand/useContacts.js";
import useListenMessages from "../../hooks/useListenMessages.js";
const Messages = () => {
  useListenMessages();
  const { loading } = useGetMessages();
  const { messages } = useContacts();
  if (loading) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }
  if (!messages || messages.length === 0) {
    return (
      <div className="flex-1 p-4 flex items-center justify-center text-gray-500">
        <Message isEmpty={true} />
      </div>
    );
  }
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {messages.map((msg) => ( // <-- CHANGED (removed idx)
        <Message key={msg.timestamp} msg={msg} /> // <-- CHANGED
      ))}
    </div>
  );
};

export default Messages;