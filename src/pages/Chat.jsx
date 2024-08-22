import React from "react";
import { ChatRoom } from "../components/Chat/ChatRoom";
import "../components/Chat/ChatRoom.css";

function Chat() {
  return (
    <div className="chatroom mp">
      <header>
        <h1>AI 대화형 음악 추천</h1>
      </header>
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

export default Chat;
