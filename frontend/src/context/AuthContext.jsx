import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const storedUser = localStorage.getItem("chat-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    }
  }, [authUser]);
  // This useEffect runs whenever 'authUser' changes.
  // If 'authUser' exists (user is authenticated), it saves the user info to localStorage under the key "chat-user".
  // If 'authUser' is null or undefined (user is logged out), it removes "chat-user" from localStorage.

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
