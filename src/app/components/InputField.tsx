import IconSend from "@/app/assets/svgs/IconSend.svg";
import { Button, Input } from "@/app/components";
import { useState } from "react";

export default function InputField({
  onClickSubmit,
}: {
  onClickSubmit: (value: string) => void;
}) {
  const [message, setMessage] = useState<string>("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value);

  const handleClickSubmit = () => {
    setMessage("");
    onClickSubmit(message);
  };

  return (
    <div className="w-full flex bg-[rgba(255,255,255,0.7)] drop-shadow-lg p-[10px]">
      <Input onChange={handleChangeInput} value={message} />
      <Button size="sm" onClick={handleClickSubmit}>
        <IconSend className="w-[20px] stroke-white" />
      </Button>
    </div>
  );
}
