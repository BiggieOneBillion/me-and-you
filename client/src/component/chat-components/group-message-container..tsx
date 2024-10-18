import GroupInfo from "./sidenav/groups/group-info";
import GroupMessageDD from "./group-message-group-info";
import { IoMdInformationCircleOutline } from "react-icons/io";
import useGroupMessageContainer from "../../hooks/useGroupMessageContainer";

/*
This component works this way, well first the route to this page is both messages/:id and messages/group/:id
When you visit that route, it will first use the route params and fetch the data from the backend and populate the chat with the previously saved chat
Then it will listen to the socket for new messages and update the chat accordingly
*/

const GroupMessageContainer: React.FC = () => {

  const { messages, recipient, isLoading, isError, decodeToken } =
    useGroupMessageContainer();

  if (isLoading) {
    <h1 className=" z-50 fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Loading....
    </h1>;
  }

  if (isError) {
    <h1 className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center text-white bg-black/50 text-2xl font-semibold">
      Error Try again....
    </h1>;
  }

  return (
    <section className="grid lg:grid-cols-3 h-full">
      <div className="h-full flex flex-col justify-between min-w-fully max-w-[500px] lg:col-span-2">
        {/* desktop view */}
        <h2 className="hidden lg:block text w-fit px-3 py-1 bg-white rounded-md border lg:border-none lg:w-full lg:text-2xl font-semibold capitalize sticky top-0 left-0 lg:bg-[#D6C3BC]y lg:bg-transparent">
          {recipient} <span className="md:hidden">group</span>
        </h2>
        {/* mobile view */}
        <GroupMessageDD>
          <h2 className="lg:hidden flex items-center gap-1 text w-fit px-3 py-1 bg-white rounded-md border lg:border-none lg:w-full lg:text-2xl font-semibold capitalize sticky top-0 left-0 lg:bg-[#D6C3BC]y lg:bg-transparent">
            {recipient} <span className="md:hidden">group</span>
            <IoMdInformationCircleOutline />
          </h2>
        </GroupMessageDD>

        <div className="flex flex-col justify-start gap-3 items-start">
          {messages.map((msg, idx) => (
            <p
              key={idx}
              className={`flex items-center gap-2 text-sm p-2 rounded-md ${
                decodeToken.name === msg.user
                  ? "ml-auto bg-[#3b2f2c6d]"
                  : "bg-[#3b2f2ca5]"
              }`}
            >
              <span className="font-medium">{msg.user}:</span>
              <span>{msg.text}</span>
            </p>
          ))}
        </div>
      </div>
      <aside className="hidden lg:block bg-white/50 rounded-md px-5 border">
        <GroupInfo />
      </aside>
    </section>
  );
};

export default GroupMessageContainer;
