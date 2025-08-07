"use client"

import { useRef, useMemo } from "react"
import Image from "next/image"

export default function Footer() {
  const footerRef = useRef(null)

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-4 bg-gradient-to-t from-black to-charcoal border-t border-neon-blue/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="footer-content col-span-1 md:col-span-2 transition-all duration-1000 opacity-0 translate-y-8 will-change-transform will-change-opacity fadein-on-scroll">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-cyber-purple rounded-lg flex items-center justify-center p-2">
                <Image 
                  src="/logo-nobg.png" 
                  alt="NeuralCode Logo" 
                  width={40} 
                  height={40} 
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-bold font-orbitron text-white">
                Neural<span className="text-cyber-purple">Code</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              The most advanced neural library for developers. Build intelligent applications
              with gesture controls and AI components.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Documentation</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Getting Started</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Examples</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 NeuralLib. All rights reserved. Built with ❤️ for developers.
          </p>
        </div>
      </div>
    </footer>
  )
}
