"use client"

import { useState, useEffect } from "react"
import { Copy, Check, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react'

const docSections = [
  {
    title: "Getting started",
    icon: "🚀",
    items: [
      { title: "Introduction", active: true },
      { title: "Installation", active: false },
      { title: "Quick start", active: false },
    ]
  },
  {
    title: "Gesture Controls",
    icon: "✋",
    items: [
      { title: "Hand tracking", active: false },
      { title: "Gesture events", active: false },
      { title: "Custom gestures", active: false },
    ]
  },
  {
    title: "Components",
    icon: "🧩",
    items: [
      { title: "Neural Grid", active: false },
      { title: "Code Blocks", active: false },
      { title: "Animations", active: false },
    ]
  },
  {
    title: "API Reference",
    icon: "📚",
    items: [
      { title: "Core functions", active: false },
      { title: "Utilities", active: false },
    ]
  }
]

const sidebarItems = [
  "Quick start",
  "Installation", 
  "Gesture setup",
  "Components",
  "API methods",
  "Examples"
]

interface DocumentationProps {
  onBackToHome?: () => void
}

export default function Documentation({ onBackToHome }: DocumentationProps) {
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting started"])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const sampleCode = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NeuralCode demo</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
  </body>
</html>`

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle) 
        ? prev.filter(s => s !== sectionTitle)
        : [...prev, sectionTitle]
    )
  }

  return (
    <div className={`flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 transition-all duration-1000 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    } flex-col md:flex-row`}>
      {/* Sidebar (left) */}
      <div className="w-full md:w-80 bg-slate-800/50 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-700/50 overflow-y-auto">
        <div className="p-4 md:p-6">
          {docSections.map((section, index) => (
            <div 
              key={section.title} 
              className={`mb-4 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">{section.icon}</span>
                  <span className="text-white font-medium group-hover:text-purple-200 transition-colors">{section.title}</span>
                </div>
                <div className="transform transition-transform duration-300 group-hover:scale-110">
                  {expandedSections.includes(section.title) ? (
                    <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-purple-400" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-purple-400" />
                  )}
                </div>
              </button>
              
              {expandedSections.includes(section.title) && (
                <div className="ml-8 mt-2 space-y-1 animate-slide-down">
                  {section.items.map((item, itemIndex) => (
                    <button
                      key={item.title}
                      className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        item.active 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg' 
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                      style={{ animationDelay: `${itemIndex * 0.05}s` }}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        <div className={`flex-1 p-4 md:p-8 max-w-4xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-6 md:mb-8">
            <button 
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm mb-4 md:mb-6 transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to home</span>
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Get started with NeuralCode
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              NeuralCode is a powerful, feature-packed neural library. Build anything—from
              prototype to production—in minutes with gesture controls and AI components.
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6 flex items-center space-x-3">
                <span className="text-xl md:text-2xl">⚡</span>
                <span>Quick start</span>
              </h2>
              <p className="text-slate-300 mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
                Get started by including NeuralCode's production-ready CSS and JavaScript via CDN without the need for any build
                steps. See it in practice with this{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300 transition-colors">NeuralCode CodePen demo</a>.
              </p>

              <div className="space-y-6 md:space-y-8">
                <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-slate-300 mb-4 md:mb-6 text-base md:text-lg">
                    1. <strong className="text-white">Create a new</strong> <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">index.html</code> file in your project root. Include the{" "}
                    <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">&lt;meta name="viewport"&gt;</code> tag as well for{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300 transition-colors">proper responsive behavior</a> in mobile devices.
                  </p>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 md:p-6 group-hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center justify-between mb-3 md:mb-4">
                        <span className="text-slate-400 text-xs md:text-sm font-mono bg-slate-700/50 px-2 md:px-3 py-1 rounded-full">HTML</span>
                        <button
                          onClick={handleCopy}
                          className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-xs md:text-sm transition-all duration-300 hover:scale-105 group/btn"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 text-green-400 animate-bounce" />
                              <span className="text-green-400 font-medium">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                              <span className="text-slate-300 group-hover/btn:text-white transition-colors">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs md:text-sm overflow-x-auto">
                        <code className="text-slate-300 font-mono leading-relaxed">
                          {sampleCode}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-slate-300 mb-6 md:mb-8 text-base md:text-lg">
                    2. <strong className="text-white">Include NeuralCode's CSS and JS.</strong> Place the{" "}
                    <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">&lt;link&gt;</code> tag in the{" "}
                    <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">&lt;head&gt;</code> for our CSS, and the{" "}
                    <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">&lt;script&gt;</code> tag for our
                    JavaScript bundle before the closing{" "}
                    <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">&lt;/body&gt;</code>. Learn more about our{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300 transition-colors">CDN links</a>.
                  </p>

                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                    <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 md:p-6 group-hover:border-blue-500/50 transition-all duration-300">
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-slate-300 font-mono leading-relaxed">
{`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.neuralcode.dev/1.0.0/neural.min.css" rel="stylesheet">
    <title>Hello, world!</title>
  </head>
  <body>
    <h1>Hello, world!</h1>
    <script src="https://cdn.neuralcode.dev/1.0.0/neural.bundle.min.js"></script>
  </body>
</html>`}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                <span className="text-2xl">✋</span>
                <span>Gesture Controls</span>
              </h2>
              <p className="text-slate-300 mb-6 text-lg leading-relaxed">
                NeuralCode includes built-in gesture recognition using MediaPipe Hand tracking.
                Enable gesture controls with a simple initialization:
              </p>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-cyan-500/50 transition-all duration-300">
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-slate-300 font-mono leading-relaxed">
{`import { NeuralCode } from 'neuralcode'

// Initialize gesture controls
const neural = new NeuralCode({
  gestures: true,
  handTracking: {
    maxHands: 2,
    minDetectionConfidence: 0.5
  }
})

// Listen for gesture events
neural.on('pinch', (data) => {
  console.log('Pinch detected:', data)
})`}
                    </code>
                  </pre>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar -> hidden on small, shows on lg+ */}
        <div className={`hidden lg:block w-64 p-6 border-l border-slate-700/50 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
          <div className="sticky top-6">
            <h3 className="text-white font-semibold mb-6 text-lg">On this page</h3>
            <ul className="space-y-3 text-sm">
              {sidebarItems.map((item, index) => (
                <li key={item} className={`animate-slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <a href="#" className="text-slate-400 hover:text-white transition-all duration-300 hover:translate-x-1 block py-1">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-slate-700/50 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                <span className="text-lg">💡</span>
                <span>Quick tip</span>
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Use gesture controls to navigate through documentation hands-free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
  
