"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Orb } from "./orb";

export interface ChatMessage {
  role: "user" | "corki";
  text: string;
}

interface ChatDemoProps {
  messages: ChatMessage[];
  className?: string;
}

export function ChatDemo({ messages, className }: ChatDemoProps) {
  return (
    <div className={cn("flex flex-col gap-3 p-4", className)}>
      {messages.map((message, index) => (
        <motion.div
          key={index}
          className={cn(
            "flex items-end gap-2",
            message.role === "user" ? "flex-row-reverse" : "flex-row"
          )}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.15,
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          {/* Corki avatar */}
          {message.role === "corki" && (
            <div className="flex-shrink-0 mb-1">
              <Orb size="sm" className="scale-50 -m-5" />
            </div>
          )}

          {/* Bubble */}
          <div
            className={cn(
              "max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed font-body",
              message.role === "corki"
                ? "rounded-bl-sm"
                : "rounded-br-sm"
            )}
            style={
              message.role === "corki"
                ? {
                    background:
                      "linear-gradient(135deg, rgba(123,51,70,0.5) 0%, rgba(92,31,51,0.4) 100%)",
                    border: "1px solid rgba(123,51,70,0.3)",
                    color: "#F9F6F4",
                    boxShadow: "0 2px 12px rgba(123,51,70,0.15)",
                  }
                : {
                    background: "rgba(30,21,17,0.9)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#A39B95",
                  }
            }
          >
            {message.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
