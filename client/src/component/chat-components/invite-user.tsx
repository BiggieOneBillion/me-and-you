import { FaHandshakeSimple } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { userProp, userStore } from "../../store/global-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../utils/api-settings";
import { Button, useToast } from "@chakra-ui/react";

const InviteUser = () => {
  const token = userStore((state: unknown) => (state as userProp).token);

  const toast = useToast();

  const param = useParams();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post(
        `users/invite/${param.id}`,
        {},
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
      queryClient.invalidateQueries({ queryKey: ["users-invites"] });
    },
    onError(error) {
      // console.log(error);
    },
  });

  return (
    <section className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <span>
          <FaHandshakeSimple size={40} color="#594742" />
        </span>
        <p className="capitalize font-medium lg:font-semibold text-sm lg:text-xl  flex flex-col lg:flex-row items-center lg:gap-2">
          <span className="text-black/50">
            This Person is not on your friendlist, send an invite!
          </span>
          <span className="text-xl">😎</span>
        </p>
        <Button
          className="text-sm font-medium py-1 px-3 rounded-md border"
          loadingText="Sending Invite"
          isLoading={mutation.isPending}
          onClick={() => mutation.mutate()}
        >
          {mutation.isError ? "Try again" : "Send An Invite"}
        </Button>
      </div>
    </section>
  );
};

export default InviteUser;
