"use client"

import { Search, Github, Moon, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface NavbarProps {
  currentPage: 'home' | 'docs'
  onPageChange: (page: 'home' | 'docs') => void
}

export default function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              </div>
              <span className="text-white font-bold text-xl bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                NeuralLib
              </span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => onPageChange('docs')}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === 'docs' 
                    ? 'text-white border-b-2 border-purple-400' 
                    : 'text-purple-200 hover:text-white hover:text-shadow-glow'
                }`}
              >
                Docs
              </button>
              <button
                onClick={() => onPageChange('home')}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  currentPage === 'home' 
                    ? 'text-white border-b-2 border-purple-400' 
                    : 'text-purple-200 hover:text-white hover:text-shadow-glow'
                }`}
              >
                Examples
              </button>
              <a href="#" className="text-purple-200 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-shadow-glow">
                Components
              </a>
              <a href="#" className="text-purple-200 hover:text-white text-sm font-medium transition-all duration-300 hover:scale-105 hover:text-shadow-glow">
                Blog
              </a>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4 transition-colors group-focus-within:text-purple-400" />
              <input
                type="text"
                placeholder="Search"
                className="bg-slate-800/50 text-white placeholder-purple-300 pl-10 pr-12 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-slate-800/80 w-64 transition-all duration-300 border border-slate-700/50 focus:border-purple-400/50"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 text-xs bg-slate-700/50 px-2 py-1 rounded">
                ⌘K
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <a href="#" className="text-purple-200 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Github className="h-5 w-5" />
              </a>
              <button className="text-purple-200 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12">
                <Moon className="h-5 w-5" />
              </button>
              <span className="text-purple-200 text-sm bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
                v1.0.0
              </span>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white hover:text-purple-300 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-purple-500/20 bg-slate-900/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => {
                  onPageChange('docs')
                  setIsMobileMenuOpen(false)
                }}
                className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-300"
              >
                Docs
              </button>
              <button
                onClick={() => {
                  onPageChange('home')
                  setIsMobileMenuOpen(false)
                }}
                className="block px-3 py-2 text-purple-200 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all duration-300"
              >
                Examples
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
