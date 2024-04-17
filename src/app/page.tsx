"use client";

import { Chat } from "@/app/components";

export default function Home() {
  return (
    <main className="p-[30px]">
      <div className="fixed top-0 left-0">
        <Chat />
      </div>
    </main>
  );
}
