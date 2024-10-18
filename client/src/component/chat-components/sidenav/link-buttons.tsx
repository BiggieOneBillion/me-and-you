import React from "react";
import useLinkbtn from "../../../hooks/useLinkbtn";

type Props = {
  btnLinkText: string;
  linkTo: string;
};

const ButtonLink: React.FC<Props> = ({ btnLinkText, linkTo }) => {

  const { handleClick, recipient } = useLinkbtn(linkTo, btnLinkText);

  return (
    <button
      onClick={handleClick}
      className={`inline-block text-left px-2 border-l-white/30 border-l-2 border-b border-white/10 text-sm ${
        recipient === btnLinkText
          ? "bg-blacky bg-[#575759] py-1"
          : "bg-transparent"
      }`}
    >
      {btnLinkText}
    </button>
  );
};

export default ButtonLink;
