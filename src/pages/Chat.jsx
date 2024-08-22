import React from "react";
import { ChatRoom } from "../components/Chat/ChatRoom";
import "../components/Chat/ChatRoom.css";

function Chat() {
  return (
    <div className="chatroom mp">
      <section>
        <ChatRoom />
      </section>
    </div>
  );
}

export default Chat;
