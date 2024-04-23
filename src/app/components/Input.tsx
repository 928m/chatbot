interface InputProps {
  type?: "text" | "password" | "email" | "number" | "search";
  placeholder?: string;
  value?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function Input({
  type = "text",
  placeholder = "",
  value = "",
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  disabled = false,
}: InputProps) {
  return (
    <input
      className="flex w-full h-[40px] px-[10px] bg-transparent"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
}
