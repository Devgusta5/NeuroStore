"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Documentation from "./Documentation/Documentation"
import NeuralGrid from "./components/NeuralGrid"
import Footer from "./components/Footer"
import CursorTrail from "./components/CursorTrail"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'inicio' | 'docs' | 'planos' | 'blog'>('inicio')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Inicializa o tema (classe 'dark' + data-theme) na carga
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    const next = saved ?? (prefersDark ? 'dark' : 'light')
    const html = document.documentElement
    html.classList.toggle('dark', next === 'dark')
    html.setAttribute('data-theme', next)
  }, [])

  // Ouve navegação disparada pelo HandTracker (ex.: openDocs)
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ page?: 'inicio' | 'docs' | 'planos' | 'blog' }>
      if (ce.detail?.page) setCurrentPage(ce.detail.page)
    }
    window.addEventListener('handtracker:navigate', handler as EventListener)
    return () => window.removeEventListener('handtracker:navigate', handler as EventListener)
  }, [])

  return (
    <div
      className={`min-h-screen bg-gradient-to-br
      from-zinc-50 via-violet-100 to-zinc-50
      dark:from-slate-900 dark:via-purple-900 dark:to-slate-900
      text-foreground transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <CursorTrail />
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {currentPage === 'inicio' ? (
        <>
          <Hero />
          <NeuralGrid />
          <Footer />
        </>
      ) : currentPage === 'docs' ? (
        <Documentation />
      ) : null}
    </div>
  )
}
