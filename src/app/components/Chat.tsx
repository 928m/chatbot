import {
  BotLoading,
  ChatBox,
  InputField,
  Message,
  MessageBox,
  Spacing,
} from "@/app/components";

import { testData } from "@/app/test-data";

import axios from "axios";
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

      setChatMessages((prev) => [...prev, { type: "BOT", value: data.result }]);
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
        dataType: "json",
        customPrompt: `
          한국어로 답해주세요.
          전달된 데이터는 상품 정보 리스트 입니다.
          상품 이름, 가격, 할인, 브랜드 이름 정보와 함께 상품의 'https://product.29cm.co.kr/catalog/[itemNo]'로 url을 제공해주세요.
        `,
        // api 호출로 받아온 json 데이터로 가정
        data: testData,
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
            <Message type={message.type}>{message.value}</Message>
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
