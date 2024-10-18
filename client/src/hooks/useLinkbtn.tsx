import { messageProp, messageStore } from "../store/message-store";
import { useNavigate } from "react-router-dom";

function useLinkbtn(linkTo: string, btnLinkText: string) {
  const updateRecipient = messageStore(
    (state: unknown) => (state as messageProp).updateRecipient
  );

  const recipient = messageStore(
    (state: unknown) => (state as messageProp).recipient
  );

  const navigate = useNavigate();

  // this function updates the route and updates the recipeint name in the message-container
  const handleClick = () => {
    navigate(linkTo);
    updateRecipient(btnLinkText);
  };
  return {
    recipient,
    handleClick,
  };
}

export default useLinkbtn;
