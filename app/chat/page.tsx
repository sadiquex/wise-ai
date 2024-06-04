"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useChat } from "ai/react";
import React, { useRef, useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import Suggestion from "../components/suggestion";
import Sidebar from "../components/sidebar";
import { useSession } from "next-auth/react";

export default function page() {
  const { data: session } = useSession();

  const [recentChats, setRecentChats] = useState<
    { question: string; answer: string }[]
  >([]);

  const { messages, input, setInput, handleInputChange, handleSubmit } =
    useChat();
  const chatParent = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const domNode = chatParent.current;
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  });

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent the default form behavior of (submitting)
    if (input.trim() !== "") {
      setRecentChats((prev) => [{ question: input, answer: "" }, ...prev]); // pass the input message to recent chat array
      setInput(""); // clear the input field
    }
    handleSubmit(e); // send chat to the api
  };

  const suggestionQuestions = [
    "Settle a debate: how should you store a bread?",
    "Brainstorm ideas for a cocktail given specific ingredients",
    "Write a product description for a new type of toothbrush",
  ];

  return (
    <main className="flex w-full h-screen max-h-dvh bg-background">
      <Sidebar recentChats={recentChats} />

      {/* chat section */}
      <aside className="p-4 flex-1 bg-[#fcfcfd] h-full flex flex-col items-center justify-center">
        <section className="bg-[#eaecf5] dark:bg-black rounded-md max-w-2xl p-8 flex flex-col gap-4">
          {/* title */}
          <div className="flex flex-col gap-2">
            <h2 className="text-primary text-4xl font-semibold">
              Yo, {session?.user?.name?.split(" ")[0]}
            </h2>
            <h2 className="text-foreground text-4xl font-semibold">
              How can I help you today?
            </h2>
          </div>

          {/* cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {suggestionQuestions.map((question, i) => (
              <Suggestion
                question={question}
                key={i}
                onClick={() => setInput(question)} // pass the suggestion question to the input field
              />
            ))}
          </div>

          {/* input field */}
          <form
            onSubmit={handleSendMessage}
            className="flex w-full items-center"
          >
            <Input
              className="flex-1 min-h-[40px]"
              placeholder="Enter a prompt here"
              type="text"
              value={input}
              onChange={handleInputChange}
            />
            <Button className="ml-2" type="submit">
              <FiSend />
            </Button>
          </form>
        </section>

        {/* messages */}
        <section className="container px-0 pb-10 flex gap-4 mx-auto max-w-3xl">
          <ul
            ref={chatParent}
            className="h-1 p-4 flex-grow bg-muted/50 rounded-lg overflow-y-auto flex flex-col gap-4"
          >
            {messages.map((m, index) => (
              <React.Fragment key={index}>
                {m.role === "user" ? (
                  <li key={index} className="flex flex-row">
                    <div className="rounded-xl p-4 bg-background shadow-md flex">
                      <p className="text-primary">{m.content}</p>
                    </div>
                  </li>
                ) : (
                  <li key={index} className="flex flex-row-reverse">
                    <div className="rounded-xl p-4 bg-background shadow-md flex w-3/4">
                      <p className="text-primary">
                        <span className="font-bold">Answer: </span>
                        {m.content}
                      </p>
                    </div>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </section>
      </aside>
    </main>
  );
}
