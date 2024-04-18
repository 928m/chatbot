import {
  BotLoading,
  ChatBox,
  InputField,
  Message,
  MessageBox,
  Spacing,
} from "@/app/components";

import axios from "axios";
import { marked } from "marked";
import { useEffect, useState } from "react";

type ChatMessage = {
  type: "USER" | "BOT";
  value: string;
};

export default function Chat() {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [botServerLoading, setBotServerLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const loadChat = async (value: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api", { params: { message: value } });
      const botMessage = await marked.parse(data.result);

      setChatMessages((prev) => [...prev, { type: "BOT", value: botMessage }]);
    } catch (err: any) {
      console.error(err.message);
      alert("메시지 전송에 실패했습니다.");
      debugger;
    } finally {
      setLoading(false);
    }
  };

  const handleClickSubmit = (value: string) => {
    setChatMessages((prev) => [...prev, { type: "USER", value }]);
    loadChat(value);
  };

  const initBot = async () => {
    try {
      setBotServerLoading(true);
      await axios.post("/api", {
        dataType: "url",
        customPrompt: `
          제공된 문서와 문맥을 기반으로 질문에 답하십시오.
          예제 코드 만들어주세요.
          참고한 문서의 원본 내용이 있는 링크도 함께 제공해주세요.:
        `,
        data: "https://react.dev/reference/react",
      });
    } catch (error) {
      console.error(error);
      alert("챗봇 로드를 실패했습니다.");
    } finally {
      setBotServerLoading(false);
    }
  };

  useEffect(() => {
    initBot();
  }, []);

  if (botServerLoading) {
    return <BotLoading />;
  }

  return (
    <ChatBox>
      <MessageBox>
        {chatMessages.map((message, index) => (
          <div key={index}>
            <Message type={message.type} content={message.value} />
            <Spacing size={20} />
          </div>
        ))}
        {loading && (
          <Message type="BOT">
            <BotLoading />
          </Message>
        )}
      </MessageBox>
      <InputField onClickSubmit={handleClickSubmit} />
    </ChatBox>
  );
}
