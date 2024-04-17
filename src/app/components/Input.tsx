export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="w-full">
      <input
        type="text"
        className="flex w-full h-[40px] px-[10px] bg-transparent"
        {...props}
      />
    </div>
  );
}
