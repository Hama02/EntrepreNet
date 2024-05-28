import React, { useState } from 'react';
import './ChatContainer.scss';

function ChatBox() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleClose = () => setIsOpen(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, inputMessage.trim()]);
      setInputMessage('');
    }
  };

  return (
    isOpen && (
      <div className="chat-box">
        <div className="chat-header">
          <span>Chat</span>
          <button onClick={handleClose}>X</button>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    )
  );
}

export default ChatBox;
