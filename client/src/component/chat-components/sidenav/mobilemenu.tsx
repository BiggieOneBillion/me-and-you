import React from "react";
import { FaBars } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import LogOutBtn from "../../logout-btn";

type Props = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: React.SetStateAction<boolean>) => void;
};

const MobileMeun: React.FC<Props> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-[#705953]y bg-[#0C0C0D] text-white md:hidden">
      <h1 className="text-lg font-medium flex items-center gap-2">
        <IoIosChatboxes />
        <span>RSC</span>
      </h1>
      <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="ml-auto mr-3">
        {isSidebarOpen ? <IoClose className="w-6 h-6"/> : <FaBars className="w-6 h-6" />}
      </button>
      <LogOutBtn/>
    </div>
  );
};

export default MobileMeun;
