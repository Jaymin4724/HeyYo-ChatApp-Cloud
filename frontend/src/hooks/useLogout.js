import { useContext, useState } from "react";
import axios from "axios";
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
      await axios.post("/api/auth/logout");
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
