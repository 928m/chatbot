import clsx from "clsx";

export default function Message({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "USER" | "BOT";
}) {
  return (
    <div>
      <div
        className={clsx(
          "text-xs font-bold",
          type === "BOT" && "text-primary800"
        )}
      >
        {type === "USER" ? "me" : "bot"}
      </div>
      <div
        className={clsx(
          "rounded-[8px] text-sm drop-shadow-md py-[5px]",
          type === "BOT" && "text-primary800"
        )}
      >
        {children}
      </div>
    </div>
  );
}
