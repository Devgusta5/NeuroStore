"use client"

import { useState, useEffect, useRef } from "react"
import { Copy, Check, Zap, Brain, Eye, Code } from 'lucide-react'

const codeExamples = [
  {
    id: 1,
    title: "Gesture Recognition",
    description: "Detect hand gestures with MediaPipe integration",
    category: "Gestures",
    icon: Eye,
    color: "from-purple-500 to-blue-500",
    code: `import { GestureRecognizer } from 'neuralcode'

const recognizer = new GestureRecognizer({
  maxHands: 2,
  minConfidence: 0.7
})

recognizer.on('pinch', (data) => {
  console.log('Pinch detected:', data.position)
})

recognizer.start()`,
  },
  {
    id: 2,
    title: "Neural Network",
    description: "Simple neural network implementation",
    category: "AI",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    code: `import { NeuralNetwork } from 'neuralcode'

const network = new NeuralNetwork({
  layers: [784, 128, 64, 10],
  activation: 'relu',
  optimizer: 'adam'
})

// Train the network
network.train(trainingData, {
  epochs: 100,
  batchSize: 32
})`,
  },
  {
    id: 3,
    title: "Code Highlighting",
    description: "Syntax highlighting with copy functionality",
    category: "UI",
    icon: Code,
    color: "from-cyan-500 to-purple-500",
    code: `import { CodeBlock } from 'neuralcode'

const codeBlock = new CodeBlock({
  language: 'javascript',
  theme: 'dark',
  copyButton: true,
  lineNumbers: true
})

codeBlock.render(document.getElementById('code'))`,
  },
  {
    id: 4,
    title: "Animation Utils",
    description: "Smooth animations without heavy libraries",
    category: "Utils",
    icon: Zap,
    color: "from-purple-500 to-pink-500",
    code: `import { animate } from 'neuralcode'

animate({
  element: '.card',
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
  duration: 500,
  easing: 'ease-out'
})`,
  },
]

export default function NeuralGrid() {
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0')
            setVisibleCards(prev => [...prev, cardId])
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('[data-card-id]')
    cards.forEach(card => observerRef.current?.observe(card))

    return () => observerRef.current?.disconnect()
  }, [])

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section className="py-20 px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Code Examples
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Ready-to-use code snippets for common neural and gesture recognition tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {codeExamples.map((example, index) => {
            const Icon = example.icon
            const isVisible = visibleCards.includes(example.id)
            
            return (
              <div
                key={example.id}
                data-card-id={example.id}
                className={`group relative bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 ${
                  isVisible ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-8'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${example.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${example.color} p-[1px]`}>
                    <div className="w-full h-full bg-slate-800/90 rounded-2xl"></div>
                  </div>
                </div>

                <div className="relative p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${example.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 group-hover:bg-clip-text transition-all duration-300">
                          {example.title}
                        </h3>
                        <p className="text-slate-400 text-sm">{example.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 bg-gradient-to-r ${example.color} text-white text-xs rounded-full font-medium shadow-lg`}>
                      {example.category}
                    </span>
                  </div>

                  <div className="relative">
                    <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 group-hover:border-slate-600/50 transition-colors duration-300">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 text-xs font-mono">JavaScript</span>
                        <button
                          onClick={() => handleCopy(example.code, example.id)}
                          className="flex items-center space-x-2 px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-xs transition-all duration-300 hover:scale-105 group/btn"
                        >
                          {copiedId === example.id ? (
                            <>
                              <Check className="h-3 w-3 text-green-400 animate-bounce" />
                              <span className="text-green-400 font-medium">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                              <span className="text-slate-300 group-hover/btn:text-white transition-colors">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-slate-300 font-mono leading-relaxed">
                          {example.code}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${example.color} rounded-full animate-float-particle`}
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${2 + Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <button className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden">
            <span className="relative z-10">View All Examples</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </section>
  )
}
