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

    // Floating elements animation
    gsap.to(".floating-hex", {
      y: -20,
      rotation: 360,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    })

    // Holographic effect
    gsap.to(".holographic-text", {
      backgroundPosition: "200% center",
      duration: 3,
      repeat: -1,
      ease: "none",
    })

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
      {/* Advanced Background */}
      <div className="hero-bg absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-charcoal to-black opacity-90"></div>

        {/* Hexagonal Grid */}
        <div className="hexagonal-grid">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="floating-hex"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <svg width="60" height="60" viewBox="0 0 60 60">
                <polygon
                  points="30,5 50,17.5 50,42.5 30,55 10,42.5 10,17.5"
                  fill="none"
                  stroke="url(#hexGradient)"
                  strokeWidth="1"
                  opacity="0.3"
                />
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2A7DE1" />
                    <stop offset="100%" stopColor="#7F00FF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ))}
        </div>

        {/* Neural Network Visualization */}
        <div className="neural-network">
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
              <path d="M100,200 Q300,100 500,200 T900,200" stroke="#2A7DE1" strokeWidth="2" fill="none" opacity="0.6">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1000;1000,0;0,1000"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M150,400 Q350,300 550,400 T950,400" stroke="#7F00FF" strokeWidth="2" fill="none" opacity="0.6">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1000;1000,0;0,1000"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </path>
              <path d="M200,600 Q400,500 600,600 T1000,600" stroke="#4C2A85" strokeWidth="2" fill="none" opacity="0.6">
                <animate
                  attributeName="stroke-dasharray"
                  values="0,1000;1000,0;0,1000"
                  dur="6s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </svg>
        </div>
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

        {/* Quantum Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <button className="quantum-btn primary group">
            <span className="btn-text">INICIAR SEQUÊNCIA NEURAL</span>
            <div className="btn-particles"></div>
            <div className="btn-glow"></div>
          </button>

          <button className="quantum-btn secondary group">
            <span className="btn-text">DEMONSTRAÇÃO QUÂNTICA</span>
            <div className="btn-particles"></div>
            <div className="btn-glow"></div>
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

      {/* Quantum Particles */}
      <div className="quantum-particles">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="quantum-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>
    </section>
  )
}
