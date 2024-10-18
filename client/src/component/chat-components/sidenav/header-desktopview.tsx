import { Tooltip } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { userProp, userStore } from "../../../store/global-store";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IoIosNotifications } from "react-icons/io";
import NotificationDD from "../notification/notification-dropdown";
import LogOutBtn from "../../logout-btn";

type decodeTokenType = {
  userId: string;
  iat: number;
  exp: number;
  name: string;
};

const HeaderDV = () => {
  const token = userStore((state: unknown) => (state as userProp).token);

  const decodeToken: decodeTokenType = jwtDecode(token);

  return (
    <div className="hidden md:flex py-4 px-5 items-center justify-end border-b">
      <div className="flex items-center gap-3">
        <NotificationDD>
          {/* <Tooltip label="Notifications" aria-label="notification button"> */}
            <span className="text-2xl">
              <IoIosNotifications />
            </span>
          {/* </Tooltip> */}
        </NotificationDD>
        <div className="h-[30px] aspect-square rounded-full border border-black ml-3"></div>
        <p className="text-sm font-medium text-black mr-3">
          {decodeToken.name}
        </p>

        <LogOutBtn />
      </div>
    </div>
  );
};

export default HeaderDV;
