import {
  ChatBox,
  InputField,
  Message,
  MessageBox,
  Spacing,
} from "@/app/components";

import axios from "axios";
import { useState } from "react";

type ChatMessage = {
  type: "USER" | "BOT";
  value: string;
};

export default function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadChat = async (value: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api", { message: value });

      setChatMessages((prev) => [...prev, { type: "BOT", value: data.result }]);
    } catch (err: any) {
      console.error(err.message);
      alert("Failed to load chat");
    } finally {
      setLoading(false);
    }
  };

  const handleClickSubmit = (value: string) => {
    setChatMessages((prev) => [...prev, { type: "USER", value }]);
    loadChat(value);
  };

  return (
    <ChatBox>
      <MessageBox>
        {chatMessages.map((message, index) => (
          <div key={index}>
            <Message type={message.type}>{message.value}</Message>
            <Spacing size={20} />
          </div>
        ))}
        {loading && <Message type="BOT">Loading...</Message>}
      </MessageBox>
      <InputField onClickSubmit={handleClickSubmit} />
    </ChatBox>
  );
}
