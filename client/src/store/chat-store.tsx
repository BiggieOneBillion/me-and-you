import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type chatProp = {
  token: string;
  updateChatId: (id: string) => void;
};

export const chatStore = create(
  persist(
    (set) => ({
      chatId: "",
      updateChatId: (id: string) => set(() => ({ chatId: id })),
    }),
    {
      name: "user-details-chat", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
