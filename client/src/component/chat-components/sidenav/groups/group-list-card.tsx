import React from "react";
import NoInvite from "../invites/no-invite";
import { useQuery } from "@tanstack/react-query";
import { userProp, userStore } from "../../../../store/global-store";
import { api } from "../../../../utils/api-settings";
import ButtonLink from "../link-buttons";
import { v4 } from "uuid";

const GroupListCard = () => {
  const token = userStore((state: unknown) => (state as userProp).token);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`chats-rooms`],
    queryFn: async () => {
      const response = await api.get(`chats/rooms`, {
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

  return (
    <section className="space-x-2 space-y-3">
      <h3 className="text-sm font-medium bg-[#594742]y bg-[#232526] py-1 px-2">Group list</h3>
      {data?.data.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {data?.data.map((item: any) => (
            <ButtonLink
              key={v4()}
              btnLinkText={item.name}
              linkTo={`group/${item._id}`}
            />
          ))}
        </ul>
      ) : (
        <NoInvite />
      )}
    </section>
  );
};

export default GroupListCard;
