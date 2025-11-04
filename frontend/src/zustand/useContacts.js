import { create } from "zustand";

const useContacts = create((set) => ({
  selectedContact: null,
  setSelectedContact: (selectedContact) => set({ selectedContact }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useContacts;
