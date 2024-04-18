import IconSend from "@/app/assets/svgs/IconSend.svg";
import { Button, Input } from "@/app/components";

export default function InputField() {
  return (
    <div className="absolute bottom-0 left-0 w-full flex bg-[rgba(255,255,255,0.7)] drop-shadow-lg p-[10px]">
      <Input onChange={(ev) => console.log(ev.target.value)} />
      <Button size="sm" onClick={() => console.log("clicked")}>
        <IconSend className="w-[20px] stroke-white" />
      </Button>
    </div>
  );
}
