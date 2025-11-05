import { useState, useContext } from "react";
import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom"; // <-- REMOVED
import api from "../api/api.js"; // <-- CHANGED
import { AuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate(); // <-- REMOVED
  const { setAuthUser } = useContext(AuthContext);

  const handleInputErrors = (formData) => {
    const { firstname, lastname, username, password, confirmPassword, gender } =
      formData;
    if (
      !firstname ||
      !lastname ||
      !username ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      toast.error("Please fill in all fields !");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match !");
      return false;
    }
    if (password.length < 6) {
      toast.error("Passwords must be at least 6 characters long !");
      return false;
    }
    return true;
  };

  const signup = async (formData) => {
    const validation = handleInputErrors(formData);
    if (!validation) return;

    setLoading(true);
    try {
      const res = await api.post("/api/auth/signup", formData); // <-- CHANGED
      toast.success("Signup successful!");
      const userData = res.data.user;
      localStorage.setItem("chat-user", JSON.stringify(userData));
      setAuthUser(userData);
      window.location.href = "/"; // <-- CHANGED
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;
