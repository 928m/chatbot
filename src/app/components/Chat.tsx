import {
  ChatBox,
  InputField,
  Message,
  MessageBox,
  Spacing,
} from "@/app/components";

export default function Chat() {
  return (
    <ChatBox>
      <MessageBox>
        <Message type="USER">
          he Internet. It uses a dictionary of over 200 Latin words, combined
          with a handful of model sentence structures, to generate Lorem Ipsum
          which looks reasonable. The generated Lorem Ipsum is therefore always
          free from repetition, injected humour, or non-characteristic words
          etc. 5 paragraphs wor
        </Message>
        <Spacing size={20} />
        <Message type="BOT">
          he Internet. It uses a dictionary of over 200 Latin words, combined
          with a handful of model sentence structures, to generate Lorem Ipsum
          which looks reasonable. The generated Lorem Ipsum is therefore always
          free from repetition, injected humour, or non-characteristic words
          etc. 5 paragraphs wor
        </Message>
      </MessageBox>
      <InputField />
    </ChatBox>
  );
}
