import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api.js"; // <-- CHANGED
import useContacts from "../zustand/useContacts";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedContact, setMessages } = useContacts();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/messages/${selectedContact.username}`); // <-- CHANGED
        setMessages(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedContact?.username) getMessages();
  }, [selectedContact?.username, setMessages]);

  return { loading };
};

export default useGetMessages;
