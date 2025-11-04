import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../../components/sidebar/Navbar.jsx";
import ContactList from "../../components/sidebar/ContactList.jsx";
import MessageContainer from "../../components/chat/MessageContainer.jsx";

const DesktopHome = () => {
  // Navbar
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // MessageContainer
  const [messageText, setMessageText] = useState("");
  const handleMessageChange = (e) => setMessageText(e.target.value);

  return (
    <div className="h-screen w-screen flex">
      {/* Sidebar */}
      <motion.div
        animate={{ width: isCollapsed ? "8%" : "30%" }}
        transition={{ duration: 0.4 }}
        className="bg-base-200 h-full flex flex-col justify-between border-r border-base-300"
      >
        {/* Navbar */}
        <div className="sticky top-0 z-10 mb-3">
          <Navbar
            title="HeyYo"
            onButtonClick={toggleSidebar}
            collapsed={isCollapsed}
            action={isCollapsed ? "login" : "chat"}
            actionColor="primary"
            gradient="from-green-300 via-blue-500 to-purple-600"
          />
        </div>

        {/* ContactList */}
        {!isCollapsed && (
          <div className="flex-1 overflow-y-auto">
            <ContactList inputColor="primary" className="px-3 pb-4" />
          </div>
        )}
      </motion.div>

      {/* MessageContainer */}
      <motion.div
        animate={{ width: isCollapsed ? "100%" : "70%" }}
        transition={{ duration: 0.4 }}
        className="h-full bg-base-100 flex flex-col"
      >
        <MessageContainer
          messageText={messageText}
          setMessageText={setMessageText}
          handleMessageChange={handleMessageChange}
        />
      </motion.div>
    </div>
  );
};

export default DesktopHome;
