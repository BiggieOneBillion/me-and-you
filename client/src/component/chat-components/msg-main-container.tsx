import MessageContainer from "./message-container";
import InviteUser from "./invite-user";
import useMsgMain from "../../hooks/useMsgMain";

const MainMsgContainer = () => {
  const { data, isError, isLoading, param } = useMsgMain();

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

  const check = data?.data.filter((el: string) => el === param.id).length > 0;

  return check ? <MessageContainer /> : <InviteUser />;
};

export default MainMsgContainer;
