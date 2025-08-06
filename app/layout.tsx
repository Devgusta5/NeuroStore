import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NeuralLib - Neural Library with Gesture Controls",
  description:
    "Powerful neural library with gesture recognition, AI components, and intelligent JavaScript plugins for modern web development.",
  keywords: "neural library, gesture controls, AI components, MediaPipe, JavaScript, web development",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  )
}
