import React, { useState } from "react";
import { getAIResponse } from "../../services/OpenAIAPI";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    const response = await getAIResponse(input);
    setMessages([
      ...messages,
      { text: input, fromUser: true },
      { text: response, fromUser: false },
    ]);
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{ textAlign: message.fromUser ? "right" : "left" }}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chatbot;
