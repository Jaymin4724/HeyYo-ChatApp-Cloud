import { useEffect, useState } from "react";

import Navbar from "../../components/sidebar/Navbar.jsx";
import ContactList from "../../components/sidebar/ContactList.jsx";
import MessageContainer from "../../components/chat/MessageContainer.jsx";
import useContacts from "../../zustand/useContacts.js";
const MobileHome = () => {
  const { selectedContact, setSelectedContact } = useContacts();
  // Navbar
  const [showContacts, setShowContacts] = useState(true);

  useEffect(() => {
    if (selectedContact) toggleView();
  }, [selectedContact]);
  const toggleView = () => {
    setShowContacts(!showContacts);
    if (!showContacts) setSelectedContact(null);
  };

  // MessageContainer
  const [messageText, setMessageText] = useState("");
  const handleMessageChange = (e) => setMessageText(e.target.value);

  return (
    <div className="h-[90vh] overflow-hidden w-screen flex flex-col bg-base-100">
      {/* Navbar */}

      <div className="sticky top-0 z-10">
        <Navbar
          title="HeyYo"
          onButtonClick={toggleView}
          action={showContacts ? "chat" : "logout"}
          actionColor="secondary"
          gradient="from-pink-500 via-red-500 to-yellow-500"
        />
      </div>

      {/* Contacts List */}
      {showContacts ? (
        <div className="flex-1 overflow-y-auto">
          <ContactList inputColor="secondary" />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <MessageContainer
            messageText={messageText}
            setMessageText={setMessageText}
            handleMessageChange={handleMessageChange}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
};

export default MobileHome;
