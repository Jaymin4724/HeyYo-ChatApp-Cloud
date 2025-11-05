import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api.js"; // <-- CHANGED
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
      const res = await api.post(
        // <-- CHANGED
        `/api/messages/send/${selectedContact.username}`,
        { message }
      );
      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
