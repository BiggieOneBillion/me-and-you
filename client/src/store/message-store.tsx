import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type messageProp = {
  recipient: string;
  updateRecipient: (id: string) => void;
};

export const messageStore = create(
  persist(
    (set) => ({
      recipient: "",
      updateRecipient: (name: string) => set(() => ({ recipient: name })),
    }),
    {
      name: "message-chat-user", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
