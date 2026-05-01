import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { Send, X } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi there! I am the Smart Election Guide. How can I help you understand the voting process in India?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleTriggerChat = (e: CustomEvent) => {
      setIsOpen(true);
      const prompt = e.detail?.prompt;
      if (prompt) {
        sendPrompt(prompt);
      }
    };
    window.addEventListener("triggerChat", handleTriggerChat as EventListener);
    return () => window.removeEventListener("triggerChat", handleTriggerChat as EventListener);
  }, [isLoading]);

  const sendPrompt = async (text: string) => {
    if (!text.trim() || isLoading) return;
    
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/smartElectionAgent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: text }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const resJson = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: resJson.result },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Make sure the Genkit server is running.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    sendPrompt(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-2xl rounded-2xl w-80 md:w-96 h-[500px] mb-4 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#5bfcc4] via-[#f593e4] to-[#71a4f0] p-4 flex justify-between items-center text-white">
            <h3 className="font-bold text-lg text-shadow-sm">Smart Election Guide</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-black/10 p-1 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-gray-700 rounded-bl-none text-sm whitespace-pre-wrap"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-3 rounded-2xl rounded-bl-none flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question..."
              className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 text-sm dark:text-white"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 transition"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      {/* The Floating Button from Uiverse */}
      {!isOpen && (
        <div className="outer-cont" onClick={() => setIsOpen(true)}>
          <svg
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none">
              <path
                d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z"
              ></path>
              <path
                d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16l.807 2.36a4 4 0 0 0 2.276 2.411l.217.081l2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06l-2.36.807a4 4 0 0 0-2.412 2.276l-.081.216l-.806 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16l-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081l-2.36-.806c-1.751-.598-1.804-3.016-.16-3.724l.16-.062l2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM11 6.094l-.806 2.36a6 6 0 0 1-3.49 3.649l-.25.091l-2.36.806l2.36.806a6 6 0 0 1 3.649 3.49l.091.25l.806 2.36l.806-2.36a6 6 0 0 1 3.49-3.649l.25-.09l2.36-.807l-2.36-.806a6 6 0 0 1-3.649-3.49l-.09-.25zM19 2a1 1 0 0 1 .898.56l.048.117l.35 1.026l1.027.35a1 1 0 0 1 .118 1.845l-.118.048l-1.026.35l-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117l-.35-1.026l-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048l1.026-.35l.35-1.027A1 1 0 0 1 19 2"
                fill="currentColor"
              ></path>
            </g>
          </svg>
          Ask RAJ
        </div>
      )}
    </div>
  );
};
