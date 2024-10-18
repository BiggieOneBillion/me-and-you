import React from "react";

type Props = {
  messageNotifications: object[];
};

const MessageNotification: React.FC<Props> = ({ messageNotifications }) => {
  return (
    <>
      {messageNotifications.length > 0 && (
        <div className="m-1 rounded-md bg-white/20 p-2">
          <h3 className="font-semibold p-1 bg-white/30 rounded-md text-center text-xs uppercase">
            Inbox
          </h3>
          <p className="text-sm font-medium px-2">You have new messages</p>
        </div>
      )}
    </>
  );
};

export default MessageNotification;

{
  /* <ul className="space-y-3">
        {messageNotifications.map((el: any, index: number) => (
          <li className="px-2 py-1 rounded-md">Hello baba</li>
        ))}
  </ul> */
}
