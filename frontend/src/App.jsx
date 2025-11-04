import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./pages/home/Home.jsx";
import Signup from "./pages/signup/Signup.jsx";
import Login from "./pages/login/Login.jsx";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext.jsx";

const App = () => {
  const { authUser } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="*"
          element={authUser ? <Navigate to="/" /> : <Navigate to="/signup" />}
        />
      </Routes>
      <Toaster></Toaster>
    </>
  );
};

export default App;
