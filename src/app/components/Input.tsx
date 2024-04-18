export default function Input({
  onChange,
}: {
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="w-full">
      <input
        type="text"
        onChange={onChange}
        className="flex w-full h-[40px] px-[10px] bg-transparent"
      />
    </div>
  );
}
