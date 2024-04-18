import clsx from "clsx";

export default function Message({
  children,
  content,
  type,
}: {
  children?: React.ReactNode;
  content?: string;
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
      {content ? (
        <div
          className={clsx(
            "rounded-[8px] text-sm drop-shadow-md py-[5px]",
            type === "BOT" && "text-primary800"
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <div
          className={clsx(
            "rounded-[8px] text-sm drop-shadow-md py-[5px]",
            type === "BOT" && "text-primary800"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
