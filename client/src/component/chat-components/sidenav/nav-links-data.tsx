import ButtonLink from "./link-buttons";
import { useQuery } from "@tanstack/react-query";
import { userProp, userStore } from "../../../store/global-store";
import { api } from "../../../utils/api-settings";
import { jwtDecode } from "jwt-decode";
import {v4} from 'uuid'

type dataType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  friends: [];
  sentInvites: [];
  receivedInvites: [];
  createdAt: string;
};

type decodeTokenType = {
  userId: string;
  iat: number;
  exp: number;
  name: string;
};

const FetchNavLinkData = () => {
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
    // retry: false,
    // refetchInterval: false,
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

  return (
    <section className="flex flex-col gap-3">
      {data?.data.map((el: dataType) => {
        if (decodeToken.userId !== el._id) {
          return <ButtonLink key={v4()} linkTo={el._id} btnLinkText={el.username} />;
        }
      })}
    </section>
  );
};

export default FetchNavLinkData;
