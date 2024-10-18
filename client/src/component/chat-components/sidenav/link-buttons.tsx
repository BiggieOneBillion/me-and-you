import React from "react";
import { useNavigate } from "react-router-dom";
import { messageProp, messageStore } from "../../../store/message-store";

type Props = {
  btnLinkText: string;
  linkTo: string;
};

const ButtonLink: React.FC<Props> = ({ btnLinkText, linkTo }) => {
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

  return (
    <button
      onClick={handleClick}
      className={`inline-block text-left px-2 border-l-white/30 border-l-2 border-b border-white/10 text-sm ${
        recipient === btnLinkText ? "bg-blacky bg-[#575759] py-1" : "bg-transparent"
      }`}
    >
      {btnLinkText}
    </button>
  );
};

export default ButtonLink;
