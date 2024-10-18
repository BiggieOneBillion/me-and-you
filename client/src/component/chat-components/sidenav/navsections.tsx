import React from "react";

type props = {
  headertext: string;
  children: React.ReactNode;
};

const NavSection: React.FC<props> = ({ children, headertext }) => {
  return (
    <section className="space-x-3 space-y-3">
      <h4 className="text-base font-medium py-1 px-3 bg-[#3b2f2c6d]y bg-[#575759]">
        {headertext}
      </h4>
      <ul className="space-y-3">{children}</ul>
    </section>
  );
};

export default NavSection;
