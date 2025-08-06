"use client"

import { useState } from "react"
import { Copy, Check } from 'lucide-react'

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const installCommand = "npm install neuralcode@1.0.0"

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative py-20 px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Security Update Banner */}
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-500 text-black rounded-full text-sm font-medium">
            Get Security Updates for NeuralCode 1.0.0 →
          </div>
        </div>

        {/* Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">N</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Build fast, intelligent apps
          <br />
          with NeuralCode
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Powerful, extensible, and feature-packed neural library. Build and customize
          with gesture controls, utilize prebuilt AI components, and bring projects to life
          with intelligent JavaScript plugins.
        </p>

        {/* Install Command */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
          <div className="relative">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 font-mono text-left min-w-80">
              <div className="flex items-center justify-between">
                <span className="text-green-400">$ </span>
                <span className="text-gray-300 flex-1 ml-2">{installCommand}</span>
                <button
                  onClick={handleCopy}
                  className="ml-4 p-2 hover:bg-gray-700 rounded transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
            📖 Read the docs
          </button>
        </div>

        {/* Version Info */}
        <div className="text-gray-400 text-sm">
          Currently <span className="text-white font-semibold">v1.0.0</span> • 
          <a href="#" className="text-purple-400 hover:text-purple-300 ml-1">Download</a> • 
          <a href="#" className="text-purple-400 hover:text-purple-300 ml-1">All releases</a>
        </div>

        {/* Gesture Control Indicator */}
        <div className="mt-12">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300">Gesture Control Active</span>
            <div className="flex space-x-2 text-lg">
              <span>✋</span>
              <span>👆</span>
              <span>✊</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
