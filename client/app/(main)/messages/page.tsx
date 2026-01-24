import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/Button";

export default function MessagesPage() {
  return (
    <div className="bg-gray-50 py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-2">
          Messages
        </h1>
        <p className="text-gray-600 mb-10">
          Chat with your travel matches. Real-time messaging via WebSocket. (Frontend placeholder.)
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-cyan-600" />
          </div>
          <p className="text-gray-600 mb-6">
            Start a conversation from your matches. Messaging will be wired up with the backend.
          </p>
          <Link href="/matches">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white">
              View matches
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="text-cyan-600 hover:underline">Back to home</Link>
        </p>
      </div>
    </div>
  );
}
