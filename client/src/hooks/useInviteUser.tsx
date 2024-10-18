import { useParams } from "react-router-dom";
import { userProp, userStore } from "../store/global-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/api-settings";
import { useToast } from "@chakra-ui/react";

function useInviteUser() {

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
        // ! we have to handle the error condition here
      // console.log(error);
    },
  });

  return {
    mutation,
  };
}

export default useInviteUser;
