import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "NeuralCode Matrix - Controle Quântico por Gestos",
  description:
    "Transcenda os limites da programação com códigos neurais e controle por gestos usando IA quântica avançada.",
  keywords: "IA quântica, controle por gestos, códigos neurais, MediaPipe, GSAP, programação futurista",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/TextPlugin.min.js" />
      </head>
      <body className="bg-black text-white overflow-x-hidden">{children}</body>
    </html>
  )
}
