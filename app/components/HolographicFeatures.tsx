"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const features = [
  {
    icon: "🧬",
    title: "DNA Quântico",
    description: "Códigos que evoluem e se adaptam usando algoritmos genéticos quânticos",
    color: "#2A7DE1",
  },
  {
    icon: "⚡",
    title: "Processamento Neural",
    description: "Velocidade de processamento que transcende limitações físicas",
    color: "#7F00FF",
  },
  {
    icon: "🌐",
    title: "Rede Multidimensional",
    description: "Conectividade através de múltiplas dimensões da realidade",
    color: "#4C2A85",
  },
]

export default function HolographicFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.fromTo(
      ".holographic-feature",
      {
        y: 100,
        opacity: 0,
        rotationX: -45,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1.2,
        stagger: 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      },
    )
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-orbitron mb-6 holographic-text">CARACTERÍSTICAS QUÂNTICAS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="holographic-feature group">
              <div className="relative p-8 glass-effect rounded-2xl border border-gray-700/50 hover:border-neon-blue/50 transition-all duration-500">
                <div className="text-6xl mb-6 text-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{feature.description}</p>

                {/* Holographic overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${feature.color}, transparent, ${feature.color})`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
