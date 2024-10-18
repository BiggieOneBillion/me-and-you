import useMessageContainer from "../../hooks/useMessageContainer";


/*
This component works this way, well first the route to this page is both messages/:id and messages/group/:id
When you visit that route, it will first use the route params and fetch the data from the backend and populate the chat with the previously saved chat
Then it will listen to the socket for new messages and update the chat accordingly
*/

const MessageContainer = () => {

  const { decodeToken, isError, isLoading, recipient, messages } =
    useMessageContainer();

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
    <div className="h-full overflow-y-scroll flex flex-col justify-between max-w-[500px]">
      <h2 className="text w-fit px-3 py-1 bg-white rounded-md border lg:border-none lg:w-full lg:text-2xl font-semibold capitalize sticky top-0 left-0 lg:bg-[#D6C3BC]y lg:bg-transparent">
        {recipient}
      </h2>
      <div className="flex flex-col justify-start gap-3 items-start">
        {messages.map((msg, idx) => (
          <>
            <p
              key={idx}
              className={`flex items-center gap-2 text-sm p-2 rounded-md text-white ${
                decodeToken.name === msg.user
                  ? "ml-auto bg-[#3b2f2c6d]y bg-[#A6A6A6]"
                  : "bg-[#3b2f2ca5]y bg-[#575759]"
              }`}
            >
              <span className="font-medium">{msg.user}:</span>
              <span>{msg.text}</span>
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default MessageContainer;
