"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin)
}

export default function HeroAdvanced() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!heroRef.current || !titleRef.current || !subtitleRef.current) return

    // Hero animation timeline
    const tl = gsap.timeline({ delay: 1.5 })

    // Animated text typing effect
    tl.to(titleRef.current, {
      text: "NEURAL CODE MATRIX",
      duration: 2,
      ease: "none",
    }).to(
      subtitleRef.current,
      {
        text: "Controle quântico por gestos • IA avançada • Códigos neurais",
        duration: 1.5,
        ease: "none",
      },
      "-=0.5",
    )

    // Parallax scroll effect
    gsap.to(".hero-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified Background */}
      <div className="hero-bg absolute inset-0 bg-gradient-to-br from-black to-charcoal"></div>

      {/* Simplified Neural Network Visualization */}
      <div className="neural-network opacity-20">
        <svg className="w-full h-full absolute inset-0" viewBox="0 0 1200 800">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="neural-connections" filter="url(#glow)">
            <path d="M100,200 Q300,100 500,200" stroke="#2A7DE1" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M150,400 Q350,300 550,400" stroke="#7F00FF" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M200,600 Q400,500 600,600" stroke="#4C2A85" strokeWidth="2" fill="none" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
        {/* Holographic Title */}
        <h1
          ref={titleRef}
          className="holographic-text text-6xl md:text-8xl font-bold font-orbitron mb-8 bg-gradient-to-r from-neon-blue via-cyber-purple to-neon-blue bg-clip-text text-transparent bg-size-200 animate-pulse-glow"
        >
          {/* Text will be animated by GSAP */}
        </h1>

        {/* Animated Subtitle */}
        <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 mb-12 font-mono">
          {/* Text will be animated by GSAP */}
        </p>

        {/* Clean Design Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="quantum-btn primary px-8 py-4 text-lg font-semibold rounded-full bg-neon-blue text-black hover:bg-cyber-purple transition-colors">
            INICIAR SEQUÊNCIA NEURAL
          </button>

          <button className="quantum-btn secondary px-8 py-4 text-lg font-semibold rounded-full bg-cyber-purple text-black hover:bg-neon-blue transition-colors">
            DEMONSTRAÇÃO QUÂNTICA
          </button>
        </div>

        {/* Gesture Indicator */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-black/50 backdrop-blur-md border border-neon-blue/30 rounded-full">
            <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-300 font-mono">CONTROLE POR GESTOS ATIVO</span>
            <div className="gesture-icons flex space-x-2">
              <span className="text-lg">✋</span>
              <span className="text-lg">👆</span>
              <span className="text-lg">✊</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
