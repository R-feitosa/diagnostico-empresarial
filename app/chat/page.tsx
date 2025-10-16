
import Header from "@/components/header";
import ChatInterface from "@/components/chat-interface";
import GeometricBackground from "@/components/geometric-background";

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <GeometricBackground />
      </div>
      <div className="relative z-10">
        <Header />
        <ChatInterface />
      </div>
    </main>
  );
}
