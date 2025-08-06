"use client"

import { useState } from "react"
import { Copy, Check } from 'lucide-react'

const codeExamples = [
  {
    id: 1,
    title: "Gesture Recognition",
    description: "Detect hand gestures with MediaPipe integration",
    category: "Gestures",
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

  const handleCopy = (code: string, id: number) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Code Examples</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Ready-to-use code snippets for common neural and gesture recognition tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {codeExamples.map((example) => (
            <div key={example.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{example.title}</h3>
                    <p className="text-gray-300 text-sm">{example.description}</p>
                  </div>
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
                    {example.category}
                  </span>
                </div>

                <div className="relative">
                  <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-400 text-xs font-mono">JavaScript</span>
                      <button
                        onClick={() => handleCopy(example.code, example.id)}
                        className="flex items-center space-x-1 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs transition-colors"
                      >
                        {copiedId === example.id ? (
                          <>
                            <Check className="h-3 w-3 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 text-gray-400" />
                            <span className="text-gray-300">Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-gray-300 font-mono leading-relaxed">
                        {example.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            View All Examples
          </button>
        </div>
      </div>
    </section>
  )
}
