"use client"

import { useState, useEffect } from "react"
import { gsap } from "gsap"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    gsap.fromTo(".navbar", { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.5 })
  }, [])

  return (
    <nav
      className={`navbar fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-neon-blue/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-cyber-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="text-xl font-bold font-orbitron text-white">
              Neural<span className="text-cyber-purple">Code</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-neon-blue transition-colors">
              Início
            </a>
            <a href="#" className="text-white hover:text-neon-blue transition-colors">
              Marketplace
            </a>
            <a href="#" className="text-white hover:text-neon-blue transition-colors">
              Docs
            </a>
            <a href="#" className="text-white hover:text-neon-blue transition-colors">
              Preços
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="quantum-btn secondary">
              <span className="btn-text">Login</span>
            </button>
            <button className="quantum-btn primary">
              <span className="btn-text">Cadastrar</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-neon-blue" data-menu-toggle>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-1" : ""}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${isOpen ? "opacity-0" : ""}`}
                ></span>
                <span
                  className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${isOpen ? "-rotate-45 -translate-y-1" : ""}`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md border-t border-neon-blue/20">
              <a href="#" className="block px-3 py-2 text-white hover:text-neon-blue">
                Início
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:text-neon-blue">
                Marketplace
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:text-neon-blue">
                Docs
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:text-neon-blue">
                Preços
              </a>
              <div className="flex space-x-2 px-3 py-2">
                <button className="flex-1 quantum-btn secondary">
                  <span className="btn-text">Login</span>
                </button>
                <button className="flex-1 quantum-btn primary">
                  <span className="btn-text">Cadastrar</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
