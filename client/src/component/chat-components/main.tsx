import React from "react";

const MainSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex-1 flex flex-col bg-[#d6c3bc]y bg-zinc-100 pb-5">{children}</main>
  );
};1
export default MainSection;
