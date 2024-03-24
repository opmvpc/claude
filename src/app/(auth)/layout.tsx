import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Claude chat",
  description: "Chat with Claude",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className=" min-h-screen flex ">
      <div className="w-full">{children}</div>
    </main>
  );
}
