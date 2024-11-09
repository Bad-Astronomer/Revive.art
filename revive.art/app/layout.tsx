import type { Metadata } from "next";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller/SmoothScroller";

export const metadata: Metadata = {
  title: "Revive.art",
  description: "Colorize your art with the power of AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{fontFamily: "SpaceMono, monospace"}}>
        <SmoothScroller>
          <div className="dark bg-background text-foreground">
            {children}
          </div>
        </SmoothScroller>
      </body>
    </html>
  );
}
