import { userProp, userStore } from "../store/global-store";
import { useQuery } from "@tanstack/react-query";
import { api } from "../utils/api-settings";
import { useParams } from "react-router-dom";

function useMsgMain() {
  const token = userStore((state: unknown) => (state as userProp).token);

  const param = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`userInfo`],
    queryFn: async () => {
      const response = await api.get(`users/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    },
  });

  return {
    data,
    isLoading,
    isError,
    param
  };
}

export default useMsgMain;
