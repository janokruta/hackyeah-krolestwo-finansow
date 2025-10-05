import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SidebarNav } from "@/components/sidebar-nav"
import "./globals.css"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <SidebarNav />
          <main className="ml-64">{children}</main>
        </Suspense>
        <Analytics />
        <elevenlabs-convai agent-id="agent_8701k6q8znayf4g92x93vjcbd0m1"></elevenlabs-convai>
        <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
      </body>
    </html>
  )
}
