"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"

const neuralCodes = [
  {
    id: 1,
    title: "Quantum Vision AI",
    category: "Computer Vision",
    complexity: "Advanced",
    code: `import quantum_vision as qv
from neural_matrix import QuantumProcessor

# Initialize quantum vision processor
processor = QuantumProcessor(
    quantum_bits=64,
    entanglement_depth=8
)

# Process quantum visual data
result = processor.analyze_quantum_image(
    image_path="quantum_data.qimg",
    superposition_layers=True
)`,
    color: "#2A7DE1",
    icon: "🔮",
  },
  {
    id: 2,
    title: "Neural Language Matrix",
    category: "NLP",
    complexity: "Expert",
    code: `from neural_lang import QuantumNLP
import consciousness_api as ca

# Initialize quantum language model
nlp = QuantumNLP(
    model="GPT-Quantum-7B",
    consciousness_level=0.95
)

# Process with quantum understanding
response = nlp.quantum_understand(
    text="Explain quantum consciousness",
    depth_layers=12,
    entanglement=True
)`,
    color: "#7F00FF",
    icon: "🧠",
  },
  {
    id: 3,
    title: "Time Series Predictor",
    category: "Temporal AI",
    complexity: "Master",
    code: `from quantum_time import TemporalAI
import multiverse_data as md

# Initialize temporal quantum AI
temporal_ai = TemporalAI(
    dimensions=11,
    time_complexity="infinite"
)

# Predict across multiple timelines
predictions = temporal_ai.predict_multiverse(
    data=md.load_timeline_data(),
    probability_branches=1000
)`,
    color: "#4C2A85",
    icon: "⏰",
  },
  {
    id: 4,
    title: "Consciousness Simulator",
    category: "AGI",
    complexity: "Transcendent",
    code: `from consciousness import QuantumMind
from reality import SimulationEngine

# Create artificial consciousness
mind = QuantumMind(
    awareness_level=1.0,
    self_reflection=True,
    quantum_coherence=0.99
)

# Simulate conscious experience
experience = mind.simulate_consciousness(
    reality_layer="base_universe",
    perception_filters=None
)`,
    color: "#00FFFF",
    icon: "🌌",
  },
]

export default function NeuralGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedCode, setSelectedCode] = useState<any>(null)

  useEffect(() => {
    if (!gridRef.current) return

    // Grid animation
    gsap.fromTo(
      ".neural-card",
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: -45,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    )

    // Hover animations
    const cards = document.querySelectorAll(".neural-card")
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          rotationY: 5,
          z: 50,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          rotationY: 0,
          z: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })
  }, [])

  return (
    <section ref={gridRef} className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-orbitron mb-6 bg-gradient-to-r from-neon-blue to-cyber-purple bg-clip-text text-transparent">
            BIBLIOTECA NEURAL QUÂNTICA
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Códigos que transcendem a realidade convencional • Processamento quântico • IA consciente
          </p>
        </div>

        {/* Neural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 perspective-1000">
          {neuralCodes.map((code, index) => (
            <div key={code.id} className="neural-card group cursor-pointer" onClick={() => setSelectedCode(code)}>
              <div className="neural-card-inner">
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 to-black/90 backdrop-blur-md rounded-2xl border border-gray-700/50"></div>

                {/* Holographic Border */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(45deg, ${code.color}20, transparent, ${code.color}20)`,
                    border: `1px solid ${code.color}50`,
                  }}
                ></div>

                {/* Content */}
                <div className="relative z-10 p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-4xl">{code.icon}</div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-gray-400 uppercase tracking-wider">{code.category}</span>
                      <span
                        className="text-xs font-bold px-2 py-1 rounded-full mt-1"
                        style={{
                          backgroundColor: `${code.color}20`,
                          color: code.color,
                          border: `1px solid ${code.color}50`,
                        }}
                      >
                        {code.complexity}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 font-orbitron group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neon-blue group-hover:to-cyber-purple group-hover:bg-clip-text transition-all duration-300">
                    {code.title}
                  </h3>

                  {/* Code Preview */}
                  <div className="bg-black/50 rounded-lg p-4 mb-6 border border-gray-800">
                    <pre className="text-sm text-gray-300 font-mono overflow-hidden">
                      <code>{code.code.slice(0, 200)}...</code>
                    </pre>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-transparent to-transparent border border-gray-600 rounded-lg text-gray-300 font-semibold group-hover:from-neon-blue/20 group-hover:to-cyber-purple/20 group-hover:border-neon-blue group-hover:text-white transition-all duration-300">
                    ACESSAR CÓDIGO QUÂNTICO
                  </button>
                </div>

                {/* Quantum Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                      style={{
                        backgroundColor: code.color,
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantum Code Modal */}
      {selectedCode && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="quantum-modal max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="bg-gradient-to-br from-charcoal to-black border border-neon-blue/50 rounded-2xl p-8">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-white font-orbitron">{selectedCode.title}</h3>
                  <p className="text-gray-300 mt-2">
                    {selectedCode.category} • {selectedCode.complexity}
                  </p>
                </div>
                <button onClick={() => setSelectedCode(null)} className="text-gray-400 hover:text-white text-2xl">
                  ✕
                </button>
              </div>

              {/* Code Display */}
              <div className="bg-black rounded-lg p-6 border border-gray-700">
                <pre className="text-green-400 font-mono text-sm leading-relaxed overflow-auto">
                  <code>{selectedCode.code}</code>
                </pre>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-center mt-6 space-x-4">
                <button className="quantum-btn primary">
                  <span className="btn-text">COPIAR CÓDIGO</span>
                </button>
                <button className="quantum-btn secondary">
                  <span className="btn-text">DOWNLOAD</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
