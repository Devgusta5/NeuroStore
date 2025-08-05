"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!footerRef.current) return

    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      },
    )
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative py-16 px-4 bg-gradient-to-t from-black to-charcoal border-t border-neon-blue/20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="footer-content col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-cyber-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-2xl font-bold font-orbitron text-white">
                Neural<span className="text-cyber-purple">Code</span>
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transcendendo os limites da programação convencional através de códigos quânticos e controle neural por
              gestos.
            </p>
            <div className="flex space-x-4">
              {["🌐", "📱", "💻", "🚀"].map((icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-gradient-to-r from-charcoal to-indigo/20 rounded-lg flex items-center justify-center hover:from-cyber-purple/20 hover:to-neon-blue/20 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-lg">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-content">
            <h4 className="text-white font-semibold mb-6 font-orbitron">Links Quânticos</h4>
            <ul className="space-y-3">
              {["Marketplace", "Documentação", "Tutoriais", "Blog Neural", "Suporte"].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-neon-blue transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-cyber-purple rounded-full"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="footer-content">
            <h4 className="text-white font-semibold mb-6 font-orbitron">Dimensão Legal</h4>
            <ul className="space-y-3">
              {["Termos Quânticos", "Privacidade Neural", "Licenças", "Contato"].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-cyber-purple transition-colors flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-neon-blue rounded-full"></span>
                    <span>{link}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-content border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 NeuralCode Matrix. Todos os direitos reservados em todas as dimensões.
            <span className="text-cyber-purple"> Desenvolvido com IA Quântica</span>
          </p>
        </div>
      </div>

      {/* Quantum Footer Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `quantum-float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </footer>
  )
}
