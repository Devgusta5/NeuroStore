"use client"

import { X, Copy, Download } from "lucide-react"
import { useState } from "react"

export default function CodeModal({ code, onClose }: { code: any; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-charcoal rounded-2xl border border-neon-blue/50 shadow-2xl shadow-neon-blue/20 max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-indigo/20">
          <div>
            <h3 className="text-2xl font-bold text-white font-orbitron">{code.title}</h3>
            <p className="text-gray-300 mt-1">{code.description}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-indigo/20 rounded-lg transition-colors">
            <X className="h-6 w-6 text-gray-300" />
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6">
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400 font-mono">Python</span>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo/20 text-indigo rounded-lg hover:bg-neon-blue hover:text-black transition-all duration-300"
                >
                  <Copy className="h-4 w-4" />
                  <span>{copied ? "Copiado!" : "Copiar"}</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-cyber-purple/20 text-cyber-purple rounded-lg hover:bg-cyber-purple hover:text-white transition-all duration-300">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="bg-black rounded-lg p-6 overflow-auto max-h-96 border border-indigo/20">
              <pre className="text-gray-300 font-mono text-sm leading-relaxed">
                <code>{code.code}</code>
              </pre>
            </div>
          </div>

          {/* Line numbers */}
          <div className="absolute left-8 top-20 text-indigo text-sm font-mono leading-relaxed pointer-events-none">
            {code.code.split("\n").map((_, index) => (
              <div key={index} className="text-right pr-4">
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/50 border-t border-indigo/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">Categoria: {code.category}</span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  code.price === "Grátis"
                    ? "bg-green-500/20 text-green-400"
                    : code.price === "Pro"
                      ? "bg-neon-blue/20 text-neon-blue"
                      : "bg-cyber-purple/20 text-cyber-purple"
                }`}
              >
                {code.price}
              </span>
            </div>
            <button className="px-6 py-2 bg-neon-blue text-black rounded-lg font-semibold hover:bg-cyber-purple transition-all duration-300">
              Usar Este Código
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
