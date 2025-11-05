import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import useContacts from "../zustand/useContacts";

const useListenMessages = () => {
  const { socket, onlineUsers } = useContext(SocketContext);
  const { messages, setMessages } = useContacts();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      setMessages([...messages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    // Cleanup function
    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};

export default useListenMessages;