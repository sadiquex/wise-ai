import React from "react";

type RecentProps = {
  question: string;
  answer: string;
};

export default function RecentCard({ question, answer }: RecentProps) {
  return (
    <div className="rounded-md bg-[#f9fafb] p-2 border-l-4 border-[#b3b8db] hover:bg-[#b3b8db30] cursor-pointer text-sm flex flex-col gap-2">
      {/* truncate to show first 5 words */}
      <p className="font-bold">
        {question.split(" ").slice(0, 5).join(" ")}...
      </p>
      <p>{answer.split(" ").splice(0, 5).join(" ")}...</p>
    </div>
  );
}
