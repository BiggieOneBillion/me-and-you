import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import React from "react";
import { userProp, userStore } from "../../../store/global-store";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../utils/api-settings";
import MessageNotification from "./message-notification";
import InviteNotification from "./invite-notification";

type Props = {
  children: React.ReactNode;
};

const NotificationDD: React.FC<Props> = ({ children }) => {
  const token = userStore((state: unknown) => (state as userProp).token);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`user-notification`],
    queryFn: async () => {
      const response = await api.get(`notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  });

  if (isLoading) {
    <h1 className=" z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Loading....
    </h1>;
  }

  if (isError) {
    <h1 className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Error Try again....
    </h1>;
  }

  if (data?.data.data === undefined) {
    <h1 className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Error Try again....
    </h1>;
  }

  if (data?.data.data) {
    const inviteNotifications = data?.data.data.filter(
      (el: any) => el.type === "invite"
    );
    const messageNotifications = data?.data.data.filter(
      (el: any) => el.type === "message"
    );

    return (
      <Popover size={"sm"} direction="ltr">
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent padding={"10px"} width={"fit"} bgColor={"#7E6A64"}>
          <PopoverCloseButton />
          <PopoverBody padding={"0px"}>
            <section className="flex flex-col gap-5 h-[500px] bg-whitey w-[300px] py-5">
              {/* invites */}
              <InviteNotification inviteNotifications={inviteNotifications} />
              {/* messages */}
              <MessageNotification
                messageNotifications={messageNotifications}
              />
            </section>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }
};

export default NotificationDD;
