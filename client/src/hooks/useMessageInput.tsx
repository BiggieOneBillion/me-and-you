import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSocket } from "../context/socket-context";
import { userProp, userStore } from "../store/global-store";
import { jwtDecode } from "jwt-decode";
import { useLocation, useParams } from "react-router-dom";

type decodeTokenType = {
  userId: string;
  iat: number;
  exp: number;
  name: string;
};

function useMessageInput() {
  const toast = useToast();

  const token = userStore((state: unknown) => (state as userProp).token);

  const decodeToken: decodeTokenType = jwtDecode(token);

  const location = useLocation();

  const params = useParams();

  const { socket } = useSocket();

  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = () => {
    // { id, userId, text, isGroup }

    // implement your logic here
    if (newMessage.trim()) {
      if (location.pathname.includes("group")) {
        socket?.emit("sendGroupMessage", {
          id: params.id,
          userId: decodeToken.userId,
          text: newMessage,
          isGroup: true,
          name: decodeToken.name,
        });
        setNewMessage("");
      } else {
        socket?.emit("sendMessageToIndividual", {
          id: params.id,
          userId: decodeToken.userId,
          text: newMessage,
          isGroup: false,
          name: decodeToken.name,
        });
        setNewMessage("");
      }
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("message_error", () => {
        toast({
          position: "top-right",
          status: "error",
          title: "Message not sent",
          description: "Server Error",
        });
      });
    }

    return () => {
      socket?.off("message_error");
    };
  }, [socket]);


  return {
    newMessage,
    setNewMessage,
    handleSendMessage
  };
}

export default useMessageInput;
