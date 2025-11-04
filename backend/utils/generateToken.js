import jwt from "jsonwebtoken";

const generateToken = (res, username) => {
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
    httpOnly: true, // Prevent XSS attacks (cookie not accessible via JS)
    sameSite: "strict", // Prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token; // We'll return it for the login response
};

export default generateToken;