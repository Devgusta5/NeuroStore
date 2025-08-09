import type { Metadata } from "next"
import type React from "react"
import "./globals.css"
import HandTracker from "./components/HandTracker"
import Script from "next/script"
import { ThemeProvider } from './providers/theme-provider'

export const metadata: Metadata = {
  title: "NeuroStore - Neural Library with Gesture Controls",
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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider>
          {/* Conteúdo da página atual */}
          {children}

          {/* Componente de rastreamento de mãos ativo em todo o site */}
          <HandTracker />

          {/* Scripts do MediaPipe carregados via CDN (versões fixas e consistentes) */}
          <Script
            src="https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/hands.js"
            strategy="beforeInteractive"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466862/camera_utils.js"
            strategy="beforeInteractive"
          />
          <Script
            src="https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1675466124/drawing_utils.js"
            strategy="beforeInteractive"
          />
        </ThemeProvider>
      </body>
    </html>
  )
}

