import React, { useEffect, useState } from "react";
import LogoHeader from "../logo";
import NavLinks from "./nav-links";
import { createPortal } from "react-dom";

type Props = {
  isSidebarOpen: boolean;
};

const SideNav: React.FC<Props> = ({ isSidebarOpen }) => {
  const [size, setSize] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth);
    };
    document.addEventListener("resize", handleResize);
    handleResize();

    return () => document.removeEventListener("resize", handleResize);
  }, []);

  if (size < 760) {
    return createPortal(
      <div
        className={`fixed md:relative top-0 left-0 w-64 bg-[#705953]y bg-[#0C0C0D]  text-white h-full md:flex flex-col ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="p-4 space-y-10">
          <LogoHeader />
          <NavLinks />
        </div>
      </div>,
      document.getElementById("side-nav") as HTMLElement
    );
  }
  return (
    <div
      className={`fixed md:relative top-0 left-0 w-64 bg-[#705953]y bg-[#0C0C0D] text-white h-full md:flex flex-col ${
        isSidebarOpen ? "block" : "hidden md:block"
      }`}
    >
      <div className="p-4 space-y-10">
        <LogoHeader />
        <NavLinks />
      </div>
    </div>
  );
};

export default SideNav;
