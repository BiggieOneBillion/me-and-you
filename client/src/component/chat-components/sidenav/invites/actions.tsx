import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { userProp, userStore } from "../../../../store/global-store";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../../../utils/api-settings";

type Props = {
  children: React.ReactNode;
  inviteId: string;
};

const Actions: React.FC<Props> = ({ children, inviteId }) => {
  const { onClose } = useDisclosure();
  const queryClient = useQueryClient();
  const token = userStore((state: unknown) => (state as userProp).token);

  const toast = useToast();

  const mutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await api.post(
        `users/invite-response/${inviteId}`,
        { status: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      toast({
        status: "success",
        position: "top-left",
        title: "User invited successfully",
      });
      queryClient.invalidateQueries({
        queryKey: ["userInfo", "users-invites"],
      });
      // userInfo
    },
    onError(error) {
      // console.log(error);
    },
  });

  if (mutation.isPending) {
    return (
      <div className="fixed top-0 left-0 bg-black/70 h-screen w-screen z-20 flex items-center justify-center">
        <p className="text-lg text-white font-semibold">Processing.....</p>
      </div>
    );
  }

  return (
    <Popover size={"sm"} direction="ltr">
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent padding={"10px"} width={"fit"} bgColor={"#7E6A64"}>
        {/* <PopoverArrow /> */}
        <PopoverCloseButton />
        {/* <PopoverHeader>Actions</PopoverHeader> */}
        <PopoverBody padding={"0px"}>
          <div className="flex items-center gap-3">
            <Button size={"sm"} onClick={() => mutation.mutate("accepted")}>
              Accept
            </Button>
            <Button size={"sm"} colorScheme="red" onClick={onClose}>
              Reject
            </Button>
          </div>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Actions;
