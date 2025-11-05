import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useContacts from "../zustand/useContacts";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedContact, setMessages } = useContacts();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        // --- CHANGED ---
        // The API endpoint now expects the USERNAME, not the _id
        const res = await axios.get(`/api/messages/${selectedContact.username}`);
        // --- END ---
        setMessages(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    
    // --- CHANGED ---
    // We check for .username to fire the effect
    if (selectedContact?.username) getMessages();
    // --- END ---

  }, [selectedContact?.username, setMessages]); // <-- CHANGED dependency
  
  return { loading };
};

export default useGetMessages;