import { userProp, userStore } from "../../store/global-store";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../utils/api-settings";
import { useParams } from "react-router-dom";
import MessageContainer from "./message-container";
import InviteUser from "./invite-user";


const MainMsgContainer = () => {
  const token = userStore((state: unknown) => (state as userProp).token);

  const param = useParams()

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

  const check = data?.data.filter((el:string) => el  === param.id).length > 0
  
  return check ? <MessageContainer /> : <InviteUser />
};

export default MainMsgContainer;
