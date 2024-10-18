import React from "react";
import { IoIosChatboxes } from "react-icons/io";

const EmptyMsgContainer = () => {
  return (
    <section className="h-full flex items-center justify-center">
      <div className="flex flex-col gap-5 items-center">
        <span>
          <IoIosChatboxes size={40} color="#594742" />
        </span>
        <p className="capitalize font-medium lg:font-semibold text-sm lg:text-xl flex flex-col lg:flex-row items-center gap-2">
          <span className="text-black/50">
            Welcome Back Boss, So Who are talking to today?
          </span>
          <span className="text-xl">😎</span>
        </p>
      </div>
    </section>
  );
};

export default EmptyMsgContainer;
