import { Tooltip } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import useLogOut from "../hooks/useLogOut";

const LogOutBtn = () => {
  const { handleLogOut } = useLogOut();
  return (
    <Tooltip label="log out" aria-label="log out button">
      <span className="text-lg" onClick={handleLogOut}>
        <MdLogout />
      </span>
    </Tooltip>
  );
};

export default LogOutBtn;
