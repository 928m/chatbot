export default function MessageBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col p-[20px] h-[500px] overflow-auto scroll-smooth">
      {children}
    </div>
  );
}
