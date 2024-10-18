import { useEffect, useState } from "react";
import { useSocket } from "../context/socket-context";
import { userProp, userStore } from "../store/global-store";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { api } from "../utils/api-settings";
import { messageProp, messageStore } from "../store/message-store";

interface Message {
  text: string;
  user: string;
}

type decodeTokenType = {
  userId: string;
  iat: number;
  exp: number;
  name: string;
};

type fetchedDataType = {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  recipient: string;
  content: string;
  emoji: string;
  createdAt: string;
};

function useMessageContainer() {
  const [messages, setMessages] = useState<Message[]>([]);

  const token = userStore((state: unknown) => (state as userProp).token);

  const decodeToken: decodeTokenType = jwtDecode(token);

  const { socket } = useSocket();

  const params = useParams();

  const recipient = messageStore(
    (state: unknown) => (state as messageProp).recipient
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [`conversation-${params.id}`],
    queryFn: async () => {
      const response = await api.get(`chats/messages/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
    // retry: false,
    // refetchInterval: false,
  });

  useEffect(() => {
    if (socket) {
      socket.on("message", (message: Message) => {
        // console.log(message);

        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (data && data?.data) {
      const pastMessage = data?.data.map((el: fetchedDataType) => {
        return { user: el.sender.username, text: el.content };
      });
      setMessages(pastMessage);
    }
  }, [data]);

  return {
    messages,
    recipient,
    isLoading,
    isError,
    decodeToken,
  };
}

export default useMessageContainer;
