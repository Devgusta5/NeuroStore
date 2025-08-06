"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Documentation from "./components/Documentation"
import NeuralGrid from "./components/NeuralGrid"
import Footer from "./components/Footer"
import GestureController from "./components/GestureController"

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('home')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
