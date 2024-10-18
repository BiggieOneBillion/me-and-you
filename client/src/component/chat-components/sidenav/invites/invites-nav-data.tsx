import ButtonLink from "../link-buttons";
import { useQuery } from "@tanstack/react-query";
import { userProp, userStore } from "../../../../store/global-store";
import { api } from "../../../../utils/api-settings";
import { jwtDecode } from "jwt-decode";
import { v4 } from "uuid";
import SendInviteCard from "./sent-invite-card";
import NoInvite from "./no-invite";
import ReceiveInviteCard from "./received-invite-card";

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

const FetchInviteListData = () => {
  const token = userStore((state: unknown) => (state as userProp).token);

  const decodeToken: decodeTokenType = jwtDecode(token);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`users-invites`],
    queryFn: async () => {
      const response = await api.get(`users/invites`, {
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

  // console.log('Invite data',data?.data);

  // //   {
  // //     "sentInvites": [],
  // //     "receivedInvites": []
  // // }

  return (
    <section className="flex flex-col gap-3">
      <section className="space-x-2">
        <h3 className="text-sm font-medium bg-[#594742]y bg-[#232526] py-1 px-2">
          Sent Invites
        </h3>
        {data?.data.sentInvites.length > 0 ? (
          <SendInviteCard sendInvite={data?.data.sentInvites} />
        ) : (
          <NoInvite />
        )}
      </section>
      <section className="space-x-2">
        <h3 className="text-sm font-medium bg-[#594742]y bg-[#232526] py-1 px-2">
          Received Invite
        </h3>
        {data?.data.receivedInvites.length > 0 ? (
          <ReceiveInviteCard recieveInvite={data?.data.receivedInvites} />
        ) : (
          <NoInvite />
        )}
      </section>
    </section>
  );
};

export default FetchInviteListData;
