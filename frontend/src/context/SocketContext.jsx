import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import io from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
  const [socket, SetSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser) {
      const socket = io("/", {
        path: "/api/socket.io",
        query: {
          userId: authUser.username,
        },
      });
      SetSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        SetSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
