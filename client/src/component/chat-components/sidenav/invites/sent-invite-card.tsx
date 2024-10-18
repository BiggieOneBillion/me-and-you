import React from "react";
import { v4 } from "uuid";

type Props = {
  sendInvite: object[];
};

type inviteType = {
  _id: string;
  sender: string;
  recipient: {
    _id: string;
    username: string;
  };
  status: string;
  createdAt: string;
};

const SendInviteCard: React.FC<Props> = ({ sendInvite }) => {
  return (
    <>
      {sendInvite.map((invite: any) => (
        <div key={v4()} className="flex items-center justify-between px-2 py-1 bg-white/10 my-2">
          <span className="text-xs">{invite?.recipient.username}</span>
          <span className="text-xs">{invite?.status}</span>
        </div>
      ))}
    </>
  );
};

export default SendInviteCard;
