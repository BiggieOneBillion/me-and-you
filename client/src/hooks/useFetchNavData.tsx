import { useQuery } from "@tanstack/react-query";
import { userProp, userStore } from "../store/global-store";
import { api } from "../utils/api-settings";
import { jwtDecode } from "jwt-decode";

type decodeTokenType = {
  userId: string;
  iat: number;
  exp: number;
  name: string;
};

function useFetchNavData() {
  const token = userStore((state: unknown) => (state as userProp).token);

  const decodeToken: decodeTokenType = jwtDecode(token);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`users`],
    queryFn: async () => {
      const response = await api.get(`users`, {
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
    decodeToken,
  };
}

export default useFetchNavData;
