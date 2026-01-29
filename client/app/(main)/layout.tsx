import { AppHeader } from "@/components/AppHeader";
import { Footer } from "@/components/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col font-sans outline-none">
      <AppHeader />
      <main className="flex-1 outline-none">{children}</main>
      <Footer />
    </div>
  );
}
