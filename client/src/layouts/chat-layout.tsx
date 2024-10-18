// src/components/Layout.js
import  { useState } from "react";
import {
  MobileMeun,
  SideNav,
  HeaderDV,
} from "../component/chat-components/sidenav";
import {
  MainSection,
  MessageInput,
} from "../component/chat-components";
import { Outlet } from "react-router-dom";

// type Props = {
//   children: React.ReactNode;
// };

const ChatLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#232526]">
      {/* Sidebar */}
      <SideNav isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <MainSection>
        {/* Header for mobile view */}
        <MobileMeun
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* Header for desktop view--DV means desktop view */}
        <HeaderDV />
        {/* Content */}
        <section className="flex-1 overflow-scroll mb-5 p-4">
          <Outlet />
        </section>

        {/* message input */}
        <section className="mt-auto px-5">
          <MessageInput />
        </section>
      </MainSection>
    </div>
  );
};

export default ChatLayout;
