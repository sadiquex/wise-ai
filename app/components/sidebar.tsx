"use client";

import { ModeToggle } from "./ui/mode-toggle";
import { Button } from "./ui/button";
import RecentCard from "./recent-card";
import { LuLogOut } from "react-icons/lu";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Sidebar({
  recentChats,
}: {
  recentChats: { question: string; answer: string }[] | null;
}) {
  const { data: session } = useSession();

  return (
    <aside className="h-full border border-gray-200 w-[320px] p-4 flex flex-col justify-between">
      {/* top - title + chats */}
      <div className="flex flex-col gap-4">
        {/* name */}
        <div className="w-full flex justify-between items-center">
          <h3 className="font-bold text-xl">Wise AI</h3>
          <ModeToggle />
        </div>

        {/* recent chats */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Chats</h3>
          {recentChats && recentChats.length > 0 ? (
            recentChats.map((chat, i) => (
              <RecentCard
                key={i}
                question={chat.question}
                answer={chat.answer}
              />
            ))
          ) : (
            <p>No recent chat</p>
          )}
        </div>
      </div>

      {/* down - btn + profile */}
      <div className="flex flex-col gap-2">
        <Button className="w-full">+ New Chat</Button>
        <div>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="w-full flex justify-between">
            {/* user */}
            <div className="flex items-center gap-2">
              {session?.user?.image && (
                <Image
                  src={session?.user?.image as string}
                  height={40}
                  width={40}
                  alt={session?.user?.name as string}
                  className="rounded-full"
                />
              )}

              <div className="text-sm">
                <p className="font-bold">{session?.user?.name}</p>
                <p>{session?.user?.email}</p>
              </div>
            </div>
            {/* logout */}
            <button
              onClick={() => signOut({ callbackUrl: "http://localhost:3000/" })}
              className="cursor-pointer"
            >
              <LuLogOut />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
