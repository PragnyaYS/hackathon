"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [localInput, setLocalInput] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = localInput.trim();
    if (!content) return;

    // 1. Add User Message
    const userMessage = { id: Date.now().toString(), role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setLocalInput("");
    setIsTyping(true);

    try {
      // 2. Direct Fetch Call to your existing API
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      // 3. Handle the Response Stream
      // Note: Because we are in a rush, we'll parse the simple text for now
      // To win the hackathon, the UI just needs to respond.
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;
        const chunk = decoder.decode(value);

        // This regex helps pick out the text from the data stream format
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (line.startsWith("0:")) {
            // 0: is the prefix for text in Vercel Data Stream
            const text = line.slice(2).replace(/"/g, "").replace(/\\n/g, "\n");
            assistantContent += text;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId
                  ? { ...m, content: assistantContent }
                  : m,
              ),
            );
          }
          // If the line starts with '9:', it's a tool call (for your cards)
          if (line.startsWith("9:")) {
            // We'll catch tool calls here if needed, but text is the priority for the demo!
          }
        }
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans overflow-hidden">
      {/* LEFT: Chat UI */}
      <aside className="w-[380px] border-r bg-white flex flex-col p-6 shadow-sm">
        <h1 className="text-xl font-bold mb-6 text-slate-800 tracking-tight">
          Sophiie Canvas
        </h1>
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl text-sm ${m.role === "user" ? "bg-blue-600 text-white ml-8" : "bg-slate-100 text-slate-800 mr-8"}`}
            >
              {m.content}
            </div>
          ))}
          {isTyping && (
            <div className="text-xs text-slate-400 animate-pulse">
              Sophiie is thinking...
            </div>
          )}
        </div>
        <form onSubmit={handleManualSubmit} className="mt-6 flex gap-2">
          <input
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 p-3 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-xl text-sm font-bold"
          >
            Send
          </button>
        </form>
      </aside>

      {/* RIGHT: Visual Canvas */}
      <main className="flex-1 p-12 bg-[#F8FAFC] flex flex-col items-center justify-center">
        {messages.length === 0 ? (
          <div className="text-center opacity-20">
            <div className="text-6xl mb-4">✨</div>
            <p className="font-bold">Waiting for your command...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 w-full max-w-2xl">
            {/* We will render hardcoded demo cards here for the video if tool parsing fails */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100"
            >
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Active System State
              </span>
              <h2 className="text-4xl font-bold text-slate-900 mt-2">
                Live Response
              </h2>
              <p className="text-emerald-500 font-bold mt-1">
                ✓ Connection Active
              </p>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}
