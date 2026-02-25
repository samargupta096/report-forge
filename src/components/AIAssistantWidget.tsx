import React, { useState } from "react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "./ui/button";

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: "assistant" | "user", text: string }[]>([
    { role: "assistant", text: "Hello! I'm your ReportForge AI assistant. How can I help you analyze data today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: "user" as const, text: input }];
    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: "assistant", 
        text: "I'm a demo assistant! Once connected to your MCP Server, I'll be able to query the database and summarize reports for you." 
      }]);
    }, 1000);
  };

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}>
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>

      <div className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card border border-border shadow-xl rounded-xl flex flex-col transition-all duration-300 transform origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '500px', maxHeight: '80vh' }}>
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50 rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <Bot size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm">ReportForge AI</h3>
              <p className="text-xs text-muted-foreground">Always here to help</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X size={18} />
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}>
              <div className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
              </div>
              <div className={`p-3 rounded-lg text-sm ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted text-foreground rounded-tl-sm"}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-border bg-card rounded-b-xl">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex items-center gap-2"
          >
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-muted border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-3 py-2 text-sm text-foreground outline-none"
            />
            <Button type="submit" size="icon" disabled={!input.trim()} className="h-9 w-9 shrink-0">
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
