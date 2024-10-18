import React from "react";
import useChat from "../../hooks/useChat";

const Message = ({ msg }: { msg: { sender: string; content: string } }) => {
  return (
    <p>
      {msg.sender}: {msg.content}
    </p>
  );
};

const Messages = ({
  messages,
}: {
  messages: { sender: string; content: string }[];
}) => {
  return (
    <div>
      {messages.map((msg, idx) => (
        <Message msg={msg} key={idx} />
      ))}
    </div>
  );
};

const ChatComponent: React.FC = () => {
  const { sendMessage, messages, newMessage, setNewMessage } = useChat();

  return (
    <div>
      <Messages messages={messages} />

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;

{
  /* <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            {msg.sender}: {msg.content}
          </p>
        ))}
      </div> */
}
