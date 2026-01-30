"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/Button";
import {
  getPublicProfile,
  getConversations,
  getMessages,
  sendMessage as apiSendMessage,
  markMessagesRead,
  type ConversationItem,
  type ChatMessage,
} from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

const POLL_INTERVAL_MS = 4000;

function formatMessageTime(s: string) {
  try {
    const d = new Date(s);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) {
      return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
    }
    return d.toLocaleDateString("sv-SE", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

export default function MessagesClient() {
  const searchParams = useSearchParams();
  const toId = searchParams.get("to");
  const { isLoggedIn } = useAuth();
  const [conversations, setConversations] = useState<ConversationItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [toName, setToName] = useState<string | null>(null);
  const [loadingConvs, setLoadingConvs] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  function getToken(): string | null {
    return typeof window !== "undefined" ? localStorage.getItem("token") : null;
  }

  // Lista konversationer
  useEffect(() => {
    const token = getToken();
    if (!isLoggedIn || !token) {
      setLoadingConvs(false);
      return;
    }
    getConversations(token)
      .then(setConversations)
      .catch(() => setConversations([]))
      .finally(() => setLoadingConvs(false));
  }, [isLoggedIn]);

  // Hämta namn för ?to
  useEffect(() => {
    if (!toId) {
      setToName(null);
      return;
    }
    getPublicProfile(toId)
      .then((u) => setToName(u.name))
      .catch(() => setToName(null));
  }, [toId]);

  // Hämta och polla meddelanden när en konversation är vald
  useEffect(() => {
    const token = getToken();
    if (!toId || !token) {
      setMessages([]);
      return;
    }
    setLoadingMessages(true);
    setError("");
    getMessages(token, toId)
      .then((msgs) => {
        setMessages(msgs);
        markMessagesRead(token, toId).catch(() => {});
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load messages");
        setMessages([]);
      })
      .finally(() => setLoadingMessages(false));

    const interval = setInterval(() => {
      const t = getToken();
      if (!t || !toId) return;
      getMessages(t, toId)
        .then(setMessages)
        .catch(() => {});
    }, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [toId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const t = getToken();
    if (!t || !toId || !input.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      const newMsg = await apiSendMessage(t, toId, input.trim());
      setMessages((prev) => [...prev, newMsg]);
      setInput("");
      setConversations((prev) => {
        const existing = prev.find((c) => c.partnerId === toId);
        if (existing) {
          return [
            { ...existing, lastBody: newMsg.body, lastAt: newMsg.createdAt, lastFromMe: true },
            ...prev.filter((c) => c.partnerId !== toId),
          ];
        }
        return [{ partnerId: toId, partnerName: toName || "Unknown", lastBody: newMsg.body, lastAt: newMsg.createdAt, lastFromMe: true }, ...prev];
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setSending(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl text-center">
          <h1 className="text-3xl font-bold text-[#0a1628] mb-2">Messages</h1>
          <p className="text-gray-600 mb-6">Log in to view and send messages.</p>
          <Link href="/login">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">Log in</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-0px)] py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-6">Messages</h1>

        <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)] min-h-[400px]">
          {/* Konversationslista */}
          <div className="w-full md:w-80 shrink-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-100">
              <p className="text-sm text-gray-500">Conversations</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              {loadingConvs ? (
                <p className="p-4 text-sm text-gray-500">Loading…</p>
              ) : conversations.length === 0 && !toId ? (
                <p className="p-4 text-sm text-gray-500">
                  No conversations yet. Use &quot;Contact&quot; on a trip in Search to start one.
                </p>
              ) : (
                <>
                  {toId && !conversations.some((c) => c.partnerId === toId) && toName && (
                    <Link
                      href={`/messages?to=${toId}`}
                      className="block p-4 border-b border-gray-100 bg-cyan-50/50 hover:bg-cyan-50"
                    >
                      <p className="font-medium text-[#0a1628]">{toName}</p>
                      <p className="text-sm text-gray-500">Current conversation</p>
                    </Link>
                  )}
                  {conversations.map((c) => (
                    <Link
                      key={c.partnerId}
                      href={`/messages?to=${c.partnerId}`}
                      className={`block p-4 border-b border-gray-100 hover:bg-gray-50 ${
                        toId === c.partnerId ? "bg-cyan-50" : ""
                      }`}
                    >
                      <p className="font-medium text-[#0a1628]">{c.partnerName}</p>
                      <p className="text-sm text-gray-500 truncate">
                        {c.lastFromMe ? "You: " : ""}{c.lastBody}
                      </p>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Chatt */}
          <div className="flex-1 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-0">
            {!toId ? (
              <div className="flex-1 flex items-center justify-center p-8 text-center">
                <div>
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">
                    Select a conversation or start one from Search (Contact on a trip).
                  </p>
                  <Link href="/search">
                    <Button variant="outline" className="border-cyan-500 text-cyan-600">
                      Find trips
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-orange-400 flex items-center justify-center text-white font-semibold">
                    {toName?.charAt(0) || "?"}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0a1628]">{toName || "Loading…"}</p>
                    <p className="text-xs text-gray-500">Chat</p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
                  {loadingMessages ? (
                    <p className="text-sm text-gray-500">Loading messages…</p>
                  ) : (
                    <>
                      {messages.length === 0 && (
                        <p className="text-sm text-gray-500">No messages yet. Say hello!</p>
                      )}
                      {messages.map((m) => {
                        const isMe = String(m.sender._id) !== String(toId);
                        return (
                          <div
                            key={m._id}
                            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                                isMe
                                  ? "bg-cyan-500 text-white rounded-br-md"
                                  : "bg-gray-100 text-[#0a1628] rounded-bl-md"
                              }`}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words">{m.body}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  isMe ? "text-cyan-100" : "text-gray-400"
                                }`}
                              >
                                {formatMessageTime(m.createdAt)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
                {error && (
                  <p className="px-4 py-2 text-sm text-red-600 bg-red-50" role="alert">
                    {error}
                  </p>
                )}
                <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    className="flex-1 h-11 px-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none"
                    disabled={sending}
                  />
                  <Button
                    type="submit"
                    disabled={sending || !input.trim()}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-cyan-600 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
