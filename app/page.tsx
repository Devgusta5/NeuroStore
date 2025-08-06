"use client"

import { useState, useEffect } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Documentation from "./components/Documentation"
import NeuralGrid from "./components/NeuralGrid"
import Footer from "./components/Footer"
import GestureController from "./components/GestureController"
import CursorTrail from "./components/CursorTrail"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('home')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <CursorTrail />
      <GestureController />
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {currentPage === 'home' ? (
        <>
          <Hero />
          <NeuralGrid />
          <Footer />
        </>
      ) : (
        <Documentation />
      )}
    </div>
  )
}
