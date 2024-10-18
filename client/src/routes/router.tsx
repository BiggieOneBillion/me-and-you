import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Root from "../layouts/root";
import Home from "../pages/home";
import ChatPage from "../pages/chat";
import { MainMsgContainer } from "../component/chat-components";
import { EmptyMsgContainer } from "../component/chat-components/sidenav";
import GroupMessageContainer from "../component/chat-components/group-message-container.";

// Configure nested routes with JSX
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/chat" element={<ChatPage />}>
        <Route index element={<EmptyMsgContainer />} />
        <Route path=":id" element={<MainMsgContainer />} />
        <Route path="group/:id" element={<GroupMessageContainer />} />
      </Route>
    </Route>
  )
);

export default router;
