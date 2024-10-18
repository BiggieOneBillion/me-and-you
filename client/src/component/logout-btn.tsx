import { Tooltip } from "@chakra-ui/react";
import React from "react";
import { MdLogout } from "react-icons/md";
import { userStore } from "../store/global-store";
import { useNavigate } from "react-router-dom";

const LogOutBtn = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    userStore.persist.clearStorage();
    navigate("/");
  };
  return (
    <Tooltip label="log out" aria-label="log out button">
      <span className="text-lg" onClick={handleLogOut}>
        <MdLogout />
      </span>
    </Tooltip>
  );
};

export default LogOutBtn;
