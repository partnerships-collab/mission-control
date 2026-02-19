import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "./components/Sidebar";

export const metadata: Metadata = {
  title: "Mission Control 🚀 | Creators Agency",
  description: "OpenClaw Mission Control Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-900 text-zinc-100">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <header className="bg-zinc-800 border-b border-zinc-700 px-6 py-4">
              <h1 className="text-2xl font-bold text-zinc-100">Mission Control 🚀</h1>
            </header>
            <main className="flex-1 p-6">
              {children}
            </main>
            <footer className="bg-zinc-800 border-t border-zinc-700 px-6 py-4 text-center text-sm text-zinc-400">
              Creators Agency • OpenClaw
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}