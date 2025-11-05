import React, { useEffect, useState } from "react";
import api from "../api/api.js"; // <-- CHANGED
import toast from "react-hot-toast";

const useGetContacts = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const getConversations = async () => {
    setLoading(true);
    try {
      const res = api.get("/api/users"); // <-- CHANGED
      const data = (await res).data;
      if (!data) {
        toast.error("No Users Found");
        return;
      }
      setContacts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getConversations();
  }, []);

  return { loading, contacts, setContacts };
};

export default useGetContacts;
