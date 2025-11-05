import { useContext, useState } from "react";
import api from "../api/api.js"; // <-- CHANGED
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import useContacts from "../zustand/useContacts";
const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);
  const { setSelectedContact } = useContacts();
  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/api/auth/logout"); // <-- CHANGED
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      setSelectedContact(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
