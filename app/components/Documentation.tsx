"use client"

import { useState } from "react"
import { Copy, Check, ChevronDown, ChevronRight } from 'lucide-react'

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

export default function Documentation() {
  const [copied, setCopied] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Getting started"])

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
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <div className="p-6">
          {docSections.map((section) => (
            <div key={section.title} className="mb-4">
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-white font-medium">{section.title}</span>
                </div>
                {expandedSections.includes(section.title) ? (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                )}
              </button>
              
              {expandedSections.includes(section.title) && (
                <div className="ml-8 mt-2 space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.title}
                      className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                        item.active 
                          ? 'bg-purple-600 text-white' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-700'
                      }`}
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
        <div className="flex-1 p-8 max-w-4xl">
          <div className="mb-8">
            <button className="text-purple-400 hover:text-purple-300 text-sm mb-4">
              ← Back to home
            </button>
            <h1 className="text-4xl font-bold text-white mb-4">Get started with NeuralCode</h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              NeuralCode is a powerful, feature-packed neural library. Build anything—from
              prototype to production—in minutes with gesture controls and AI components.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Quick start</h2>
              <p className="text-gray-300 mb-6">
                Get started by including NeuralCode's production-ready CSS and JavaScript via CDN without the need for any build
                steps. See it in practice with this{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">NeuralCode CodePen demo</a>.
              </p>

              <div className="space-y-6">
                <div>
                  <p className="text-gray-300 mb-4">
                    1. <strong className="text-white">Create a new</strong> <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">index.html</code> file in your project root. Include the{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">&lt;meta name="viewport"&gt;</code> tag as well for{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300">proper responsive behavior</a> in mobile devices.
                  </p>

                  <div className="relative">
                    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-400 text-sm font-mono">HTML</span>
                        <button
                          onClick={handleCopy}
                          className="flex items-center space-x-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 text-green-400" />
                              <span className="text-green-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-300">Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-gray-300 font-mono leading-relaxed">
                          {sampleCode}
                        </code>
                      </pre>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-gray-300 mb-4">
                    2. <strong className="text-white">Include NeuralCode's CSS and JS.</strong> Place the{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">&lt;link&gt;</code> tag in the{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">&lt;head&gt;</code> for our CSS, and the{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">&lt;script&gt;</code> tag for our
                    JavaScript bundle before the closing{" "}
                    <code className="bg-gray-800 px-2 py-1 rounded text-purple-400">&lt;/body&gt;</code>. Learn more about our{" "}
                    <a href="#" className="text-purple-400 hover:text-purple-300">CDN links</a>.
                  </p>

                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-gray-300 font-mono leading-relaxed">
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
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Gesture Controls</h2>
              <p className="text-gray-300 mb-4">
                NeuralCode includes built-in gesture recognition using MediaPipe Hand tracking.
                Enable gesture controls with a simple initialization:
              </p>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <pre className="text-sm overflow-x-auto">
                  <code className="text-gray-300 font-mono leading-relaxed">
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
            </section>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-64 p-6 border-l border-gray-700">
          <div className="sticky top-6">
            <h3 className="text-white font-semibold mb-4">On this page</h3>
            <ul className="space-y-2 text-sm">
              {sidebarItems.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h4 className="text-white font-medium mb-2">💡 Quick tip</h4>
              <p className="text-gray-300 text-sm">
                Use gesture controls to navigate through documentation hands-free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
