"use client"

import { ArrowRight, Play } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Neural Network Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800">
          <defs>
            <linearGradient id="neuralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4C2A85" />
              <stop offset="100%" stopColor="#7F00FF" />
            </linearGradient>
          </defs>
          {/* Neural network lines */}
          <g stroke="url(#neuralGradient)" strokeWidth="1" fill="none">
            <path d="M100,200 Q300,100 500,200 T900,200" />
            <path d="M150,400 Q350,300 550,400 T950,400" />
            <path d="M200,600 Q400,500 600,600 T1000,600" />
            <path d="M200,100 L400,300 L600,150 L800,350 L1000,200" />
            <path d="M100,500 L300,300 L500,450 L700,250 L900,400" />
          </g>
          {/* Neural nodes */}
          <g fill="#7F00FF">
            <circle cx="100" cy="200" r="4" />
            <circle cx="300" cy="100" r="4" />
            <circle cx="500" cy="200" r="4" />
            <circle cx="700" cy="150" r="4" />
            <circle cx="900" cy="200" r="4" />
            <circle cx="150" cy="400" r="4" />
            <circle cx="350" cy="300" r="4" />
            <circle cx="550" cy="400" r="4" />
            <circle cx="750" cy="350" r="4" />
            <circle cx="950" cy="400" r="4" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 pt-20">
        <h1 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 bg-gradient-to-r from-white via-neon-blue to-cyber-purple bg-clip-text text-transparent">
          Seu Mercado de Códigos Neurais
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Copie, cole e customize seus modelos de IA em minutos
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group px-8 py-4 bg-neon-blue text-black rounded-lg font-semibold text-lg hover:bg-cyber-purple transition-all duration-300 shadow-lg hover:shadow-neon-blue/50 flex items-center space-x-2">
            <span>Começar Grátis</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="group px-8 py-4 border-2 border-indigo text-indigo rounded-lg font-semibold text-lg hover:border-neon-blue hover:text-neon-blue transition-all duration-300 flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Ver Demo</span>
          </button>
        </div>

        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 border border-cyber-purple/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-neon-blue/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-5 w-12 h-12 bg-gradient-to-r from-cyber-purple/20 to-neon-blue/20 rounded-full animate-ping"></div>
      </div>
    </section>
  )
}
