import React, { useState } from "react";
import ContactCard from "./ContactCard.jsx";
import InputBox from "./InputBox.jsx";
import useGetContacts from "../../hooks/useGetContacts.js";

const ContactList = ({ inputColor, className = "" }) => {
  const [Color, setColor] = useState(inputColor);
  const { loading, contacts } = useGetContacts();
  const [searchText, setSearchText] = useState("");

  const onSearchChange = (e) => setSearchText(e.target.value);

  const filteredContacts = contacts.filter((contact) => {
    const search = searchText.toLowerCase();
    return (
      contact.firstname.toLowerCase().includes(search) ||
      contact.lastname.toLowerCase().includes(search) ||
      contact.username.toLowerCase().includes(search)
    );
  });

  return (
    <div className={`w-full ${className}`}>
      <ul className="menu bg-base-100 rounded-box w-full">
        <div className="m-2">
          <InputBox
            type="text"
            placeholder="Search..."
            name="search"
            value={searchText}
            onChange={onSearchChange}
            inputColor={Color}
          />
        </div>

        {loading && <span className="loading loading-spinner"></span>}

        {!loading && filteredContacts.length === 0 && (
          <div className="text-center text-gray-400">No contacts found.</div>
        )}

        {!loading &&
          filteredContacts.map((contact) => (
            <ContactCard
              key={contact.username} // <-- CHANGED
              contact={contact}
              inputColor={Color}
            />
          ))}
      </ul>
    </div>
  );
};

export default ContactList;