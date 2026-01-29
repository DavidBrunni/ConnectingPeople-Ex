import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Connecting People",
  description: "Find your travel tribe – connect with solo travelers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="outline-none" style={{ outline: "none" }}>
      <body className="antialiased font-sans outline-none" style={{ outline: "none" }}>
        {children}
      </body>
    </html>
  );
}
