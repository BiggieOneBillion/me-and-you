import React from "react";
import { v4 } from "uuid";
import Actions from "./actions";

type Props = {
  recieveInvite: object[];
};

const ReceiveInviteCard: React.FC<Props> = ({ recieveInvite }) => {
  // // console.log('recieveInvite',recieveInvite);

  //   {
  //     "_id": "67001f717f55bc6fe2db7d9c",
  //     "sender": {
  //         "_id": "66fab09a003d77aa375545a7",
  //         "username": "sam dam"
  //     },
  //     "recipient": "66fa4f0e7681eac12f903e93",
  //     "status": "pending",
  //     "createdAt": "2024-10-04T17:01:37.333Z",
  //     "__v": 0
  // }

  return (
    <>
      {recieveInvite.map((invite: any, index: number) => (
        <Actions key={v4()} inviteId={invite._id}>
          <div className="flex items-center justify-between my-2 px-2 py-1 bg-white/10">
            <span className="text-xs">John snow</span>
            <span className="text-xs">pending</span>
          </div>
        </Actions>
      ))}
    </>
  );
};

export default ReceiveInviteCard;
