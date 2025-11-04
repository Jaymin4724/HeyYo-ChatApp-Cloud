import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import InputCard from "../../components/sidebar/InputBox";
import useSignup from "../../hooks/useSignup.js";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { loading, signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="h-[90vh] flex flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="font-bold text-3xl">
          Signup{" "}
          <span className="font-extrabold text-transparent text-3xl sm:text-4xl xl:text-5xl bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
            HeyYo
          </span>
        </h1>
      </div>

      <div className="card w-96 bg-base-200 py-3">
        <div className="card-body gap-3">
          {/* First Name & Last Name */}
          <div className="flex gap-3">
            <InputCard
              type="text"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={handleChange}
            />
            <InputCard
              type="text"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <InputCard
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          {/* Password */}
          <div className="relative">
            <InputCard
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 z-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <InputCard
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <span
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500 z-1"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          {/* Gender */}
          <select
            className="select select-primary w-full"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option disabled value="">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <Link to="/login">
            Already have an account?{" "}
            <span className="text-blue-400 cursor-pointer font-bold">
              Login
            </span>
          </Link>

          {/* Submit Button */}
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              " Sign Me Up !!"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
