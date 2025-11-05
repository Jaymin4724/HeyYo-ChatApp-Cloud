import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);

  const handleInputErrors = (formData) => {
    const { username, password } = formData;
    if (!username || !password) {
      toast.error("Please fill in all fields!");
      return false;
    }
    return true;
  };

  const login = async (formData) => {
    if (!handleInputErrors(formData)) return;

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", formData);
      toast.success("Login Successful!");
      const userData = res.data.user;
      localStorage.setItem("chat-user", JSON.stringify(userData));
      setAuthUser(userData);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;
