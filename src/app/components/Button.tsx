export default function Button({
  onClick,
  size = "md",
  color = "gray800",
  children,
}: {
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void;
  color?: "gray800" | "gray700" | "gray600";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}) {
  return (
    <button
      className={`flex items-center justify-center rounded-[8px] drop-shadow-md ${buttonColor[color]} ${buttonSize[size]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const buttonSize = {
  sm: "py-2 px-4 text-sm",
  md: "py-3 px-6 text-md",
  lg: "py-4 px-8 text-lg",
};

const buttonColor = {
  gray800: "bg-gray800 text-white",
  gray700: "bg-gray700 text-white",
  gray600: "bg-gray600 text-white",
};
