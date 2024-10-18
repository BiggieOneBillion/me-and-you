import React from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../../utils/api-settings";
import { useQuery } from "@tanstack/react-query";
import { userProp, userStore } from "../../../../store/global-store";
import { MdGroups } from "react-icons/md";
import { TbDeviceMobileMessage } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
import { MdOutlineDateRange } from "react-icons/md";
import { v4 } from "uuid";

type decodeTokenType = {
  userId: string;
  iat: number;
  exp: number;
  name: string;
};

const GroupInfo = () => {
  const param = useParams();

  const token = userStore((state: unknown) => (state as userProp).token);

  const decodeToken: decodeTokenType = jwtDecode(token);

  const { data, isLoading, isError } = useQuery({
    queryKey: [`group-info-${param.id}`],
    queryFn: async () => {
      const response = await api.get(`chats/room/info/${param.id}`, {
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
    <section className="flex flex-col">
      <section className="flex flex-col gap-1 justify-center items-centery py-5 sm:py-10 border-b border-black">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-4 capitalize">
          {data?.data.chatroom.name} Group
        </h1>
        <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1">
          <span className="text-base sm:text-lg">
            <MdGroups />
          </span>
          <span>
            Number of participant - {data?.data.chatroom.participants.length}
          </span>
        </p>
        <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1">
          <span className="text-base sm:text-lg">
            <TbDeviceMobileMessage />
          </span>
          <span>
            Number of Messages - {data?.data.chatroom.messages.length}
          </span>
        </p>
        <p className="text-xs sm:text-sm font-medium text-slate-500 flex items-center gap-1">
          <span className="text-base sm:text-lg">
            <MdOutlineDateRange />
          </span>
          <span>
            Created on -{" "}
            {new Date(data?.data.chatroom.createdAt).toLocaleDateString()}
          </span>
        </p>
      </section>
      <section className="space-y-2 py-5 sm:py-10">
        <h3 className="text-slate-600 font-semibold text-sm underline">Group members</h3>
        <ul className="flex flex-col gap-2 ">
          {data?.data.users.map((el: any) => (
            <Link key={v4()}
              to={`/chat/${el._id}`}
              className={`${
                decodeToken.userId === el._id ? "hidden" : "inline-block"
              } text-xs sm:text-sm font-sans font-semibold text-white bg-slate-600/80 px-3 py-2 rounded-md sm:min-w-[300px] min-w-[200px] w-fit `}
            >
              {el.username}
            </Link>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default GroupInfo;
