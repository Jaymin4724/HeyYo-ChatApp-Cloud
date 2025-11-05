import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useContacts from "../zustand/useContacts";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedContact, messages, setMessages } = useContacts();

  const sendMessage = async (message) => {
    if (!message.trim()) {
      return;
    }
    setLoading(true);
    try {
      // --- CHANGED ---
      // The API endpoint now expects the USERNAME
      const res = await axios.post(
        `/api/messages/send/${selectedContact.username}`,
        { message }
      );
      // --- END ---

      // --- CHANGED ---
      // Our new backend returns the message object directly, not {newMessage: ...}
      // setMessages([...messages, res.data.newMessage]); // <-- OLD
      setMessages([...messages, res.data]); // <-- NEW
      // --- END ---

    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;