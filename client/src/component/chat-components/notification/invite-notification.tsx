import React from "react";

type Props = {
  inviteNotifications: object[];
};

const InviteNotification: React.FC<Props> = ({ inviteNotifications }) => {
  return (
    <>
      {inviteNotifications.length > 0 && (
        <div className="m-1 rounded-md bg-white/20 p-2 space-y-2">
          <h3 className="font-semibold p-1 bg-white/30 rounded-md text-center text-xs uppercase">
            Chat requests
          </h3>
          <p className="text-sm font-medium px-2">
            Avaliable chat requests pending
          </p>
          {/* <ul className="space-y-3">
            {inviteNotifications.map((el: any, index: number) => (
              <li className="px-2 py-1 rounded-md">Hello baba</li>
            ))}
          </ul> */}
        </div>
      )}
    </>
  );
};

export default InviteNotification;
