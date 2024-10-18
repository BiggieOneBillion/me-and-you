import React, { useEffect, useState } from 'react';
import { useSocket } from '../../context/socket-context';

interface Message {
  content: string;
  sender: string;
}

const ChatComponent: React.FC = () => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    if (socket) {
      socket.on('message', (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      socket?.off('message');
    };
  }, [socket]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socket?.emit('sendMessage', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>{msg.sender}: {msg.content}</p>
        ))}
      </div>
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