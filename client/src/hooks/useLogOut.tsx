import { userStore } from "../store/global-store";
import { useNavigate } from "react-router-dom";

function useLogOut() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    userStore.persist.clearStorage();
    navigate("/");
  };
  return {
    handleLogOut,
  };
}

export default useLogOut;
