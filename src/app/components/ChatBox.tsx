export default function ChatBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[10px] border border-solid border-[rgba(0,0,0,0.1)] w-[340px] h-[560px] drop-shadow-lg backdrop-blur-md bg-[rgba(255,255,255,40%)]">
      {children}
    </div>
  );
}
