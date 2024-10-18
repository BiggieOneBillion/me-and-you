import { useEffect, useState } from "react";
import { useSocket } from "../context/socket-context";

interface Message {
  content: string;
  sender: string;
}

function useChat() {

  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket?.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return {
    sendMessage,
    messages,
    newMessage,
    setNewMessage
  };
}

export default useChat;
