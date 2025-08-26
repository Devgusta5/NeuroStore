"use client"

import { useState, useEffect } from "react"
import {
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  ArrowLeft,
  Search,
  BookOpen,
  Code,
  Zap,
  Settings,
  ExternalLink,
  Download,
} from "lucide-react"

const docSections = [
  {
    title: "Começar agora",
    icon: "🚀",
    items: [
      { title: "Introdução", active: true, id: "intro" },
      { title: "Instalação", active: false, id: "installation" },
      { title: "Começo rápido", active: false, id: "quickstart" },
      { title: "Configuração", active: false, id: "config" },
    ],
  },
  {
    title: "Controle de gestos",
    icon: "✋",
    items: [
      { title: "Hand tracking", active: false, id: "handtracking" },
      { title: "Gesture events", active: false, id: "events" },
      { title: "Custom gestures", active: false, id: "custom" },
      { title: "Calibração", active: false, id: "calibration" },
    ],
  },
  {
    title: "Componentes",
    icon: "🧩",
    items: [
      { title: "Neural Grid", active: false, id: "neuralgrid" },
      { title: "Code Blocks", active: false, id: "codeblocks" },
      { title: "Animações", active: false, id: "animations" },
      { title: "3D Scenes", active: false, id: "3dscenes" },
    ],
  },
  {
    title: "Referências de API",
    icon: "📚",
    items: [
      { title: "Core functions", active: false, id: "core" },
      { title: "Utilidades", active: false, id: "utils" },
      { title: "Hooks", active: false, id: "hooks" },
      { title: "Types", active: false, id: "types" },
    ],
  },
  {
    title: "Exemplos",
    icon: "💡",
    items: [
      { title: "Projetos básicos", active: false, id: "basic" },
      { title: "Casos avançados", active: false, id: "advanced" },
      { title: "Integrações", active: false, id: "integrations" },
    ],
  },
]

const sidebarItems = [
  { title: "Começo rápido", id: "quickstart" },
  { title: "Instalação", id: "installation" },
  { title: "Setup de gestos", id: "handtracking" },
  { title: "Componentes", id: "components" },
  { title: "Métodos de API", id: "api" },
  { title: "Exemplos", id: "examples" },
  { title: "Troubleshooting", id: "troubleshooting" },
  { title: "FAQ", id: "faq" },
]

const codeExamples = {
  basic: `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>NeuralCode Demo</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
  </body>
</html>`,

  cdn: `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.neuralcode.dev/1.0.0/neural.min.css" rel="stylesheet">
    <title>NeuralCode App</title>
  </head>
  <body>
    <div id="app">
      <h1>Minha App Neural</h1>
      <div class="neural-grid" data-gesture="true">
        <!-- Conteúdo aqui -->
      </div>
    </div>
    <script src="https://cdn.neuralcode.dev/1.0.0/neural.bundle.min.js"></script>
  </body>
</html>`,

  npm: `# Instalar via npm
npm install neuralcode@latest

# Ou via yarn
yarn add neuralcode

# Ou via pnpm
pnpm add neuralcode`,

  gestures: `import { NeuralCode } from 'neuralcode'

// Inicializar controles de gestos
const neural = new NeuralCode({
  gestures: true,
  handTracking: {
    maxHands: 2,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.5,
    modelComplexity: 1
  },
  debug: false
})

// Escutar eventos de gestos
neural.on('pinch', (data) => {
  console.log('Pinch detectado:', data.position, data.confidence)
})

neural.on('swipe', (data) => {
  console.log('Swipe:', data.direction, data.velocity)
})

neural.on('fist', (data) => {
  console.log('Punho fechado detectado')
})

// Iniciar tracking
neural.start()`,

  components: `import { NeuralGrid, CodeBlock, AnimatedCard } from 'neuralcode'

// Neural Grid com gestos
const grid = new NeuralGrid({
  container: '#my-grid',
  columns: 3,
  gap: 20,
  gestureEnabled: true,
  animations: {
    hover: 'lift',
    click: 'pulse'
  }
})

// Code Block com syntax highlighting
const codeBlock = new CodeBlock({
  language: 'javascript',
  theme: 'neural-dark',
  copyButton: true,
  lineNumbers: true,
  gestureScroll: true
})

// Card animado
const card = new AnimatedCard({
  animation: 'float',
  duration: 2000,
  easing: 'ease-in-out'
})`,
}

interface DocumentationProps {
  onBackToHome?: () => void
}

export default function Documentation({ onBackToHome }: DocumentationProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<string[]>(["Começar agora"])
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("intro")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle) ? prev.filter((s) => s !== sectionTitle) : [...prev, sectionTitle],
    )
  }

  const setActiveItem = (id: string) => {
    setActiveSection(id)
  }

  return (
    <div
      className={`flex min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      } flex-col lg:flex-row`}
    >
      {/* Sidebar Esquerda */}
      <div className="w-full lg:w-80 bg-slate-800/50 backdrop-blur-md border-b lg:border-b-0 lg:border-r border-slate-700/50 overflow-y-auto">
        <div className="p-4 lg:p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar na documentação..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-700/50 text-white placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:bg-slate-700/80 transition-all duration-300 border border-slate-600/50 focus:border-purple-400/50"
              />
            </div>
          </div>

          {/* Navigation Sections */}
          {docSections.map((section, index) => (
            <div
              key={section.title}
              className={`mb-4 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <button
                onClick={() => toggleSection(section.title)}
                className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {section.icon}
                  </span>
                  <span className="text-white font-medium group-hover:text-purple-200 transition-colors">
                    {section.title}
                  </span>
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
                      onClick={() => setActiveItem(item.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
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

          {/* Quick Links */}
          <div className="mt-8 p-4 bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-slate-700/50">
            <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
              <Zap className="h-4 w-4 text-purple-400" />
              <span>Links Rápidos</span>
            </h4>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center space-x-2 text-slate-300 hover:text-white text-sm transition-colors"
              >
                <Download className="h-3 w-3" />
                <span>Download v1.0.0</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-slate-300 hover:text-white text-sm transition-colors"
              >
                <ExternalLink className="h-3 w-3" />
                <span>GitHub Repository</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-2 text-slate-300 hover:text-white text-sm transition-colors"
              >
                <BookOpen className="h-3 w-3" />
                <span>Changelog</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex">
        <div
          className={`flex-1 p-4 lg:p-8 max-w-4xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 text-sm mb-6 transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Voltar para Home</span>
            </button>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Documentação NeuralCode
                </h1>
                <p className="text-slate-400 mt-1">Versão 1.0.0 • Atualizada hoje</p>
              </div>
            </div>

            <p className="text-lg lg:text-xl text-slate-300 leading-relaxed">
              Uma biblioteca neural poderosa, versátil e cheia de recursos. Construa qualquer coisa do protótipo até a
              produção em minutos com controle de gestos e componentes de IA.
            </p>
          </div>

          {/* Conteúdo Dinâmico baseado na seção ativa */}
          <div className="space-y-12">
            {/* Introdução */}
            {activeSection === "intro" && (
              <section className="animate-slide-up">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 rounded-xl border border-purple-500/20">
                    <Code className="h-8 w-8 text-purple-400 mb-3" />
                    <h3 className="text-white font-semibold mb-2">Fácil de usar</h3>
                    <p className="text-slate-300 text-sm">API simples e intuitiva para começar rapidamente</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-500/20">
                    <Zap className="h-8 w-8 text-blue-400 mb-3" />
                    <h3 className="text-white font-semibold mb-2">Performance</h3>
                    <p className="text-slate-300 text-sm">Otimizado para alta performance e baixo uso de recursos</p>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-6 rounded-xl border border-cyan-500/20">
                    <Settings className="h-8 w-8 text-cyan-400 mb-3" />
                    <h3 className="text-white font-semibold mb-2">Customizável</h3>
                    <p className="text-slate-300 text-sm">Totalmente configurável para suas necessidades</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                  <h3 className="text-xl font-semibold text-white mb-4">O que é o NeuralCode?</h3>
                  <p className="text-slate-300 leading-relaxed mb-4">
                    NeuralCode é uma biblioteca JavaScript moderna que combina inteligência artificial, reconhecimento
                    de gestos e componentes visuais avançados para criar experiências web interativas e inovadoras.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Com suporte nativo para MediaPipe Hand Tracking, animações fluidas e uma API intuitiva, você pode
                    criar aplicações que respondem a gestos naturais do usuário.
                  </p>
                </div>
              </section>
            )}

            {/* Instalação */}
            {activeSection === "installation" && (
              <section className="animate-slide-up">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span className="text-2xl">📦</span>
                  <span>Instalação</span>
                </h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Via NPM (Recomendado)</h3>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-purple-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                            Terminal
                          </span>
                          <button
                            onClick={() => handleCopy(codeExamples.npm, "npm")}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 hover:scale-105 group/btn"
                          >
                            {copied === "npm" ? (
                              <>
                                <Check className="h-4 w-4 text-green-400 animate-bounce" />
                                <span className="text-green-400 font-medium">Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                                <span className="text-slate-300 group-hover/btn:text-white transition-colors">
                                  Copiar
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code className="text-slate-300 font-mono leading-relaxed">{codeExamples.npm}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Via CDN</h3>
                    <p className="text-slate-300 mb-4">
                      Para prototipagem rápida ou projetos simples, você pode usar nosso CDN:
                    </p>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-blue-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                            HTML
                          </span>
                          <button
                            onClick={() => handleCopy(codeExamples.cdn, "cdn")}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 hover:scale-105 group/btn"
                          >
                            {copied === "cdn" ? (
                              <>
                                <Check className="h-4 w-4 text-green-400 animate-bounce" />
                                <span className="text-green-400 font-medium">Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                                <span className="text-slate-300 group-hover/btn:text-white transition-colors">
                                  Copiar
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code className="text-slate-300 font-mono leading-relaxed">{codeExamples.cdn}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Controles de Gestos */}
            {activeSection === "handtracking" && (
              <section className="animate-slide-up">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span className="text-2xl">✋</span>
                  <span>Controles de Gestos</span>
                </h2>

                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  O NeuralCode inclui reconhecimento de gestos integrado usando HandTracking do MediaPipe. Ative os
                  controles por gestos com uma simples inicialização:
                </p>

                <div className="relative group mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-cyan-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                        JavaScript
                      </span>
                      <button
                        onClick={() => handleCopy(codeExamples.gestures, "gestures")}
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 hover:scale-105 group/btn"
                      >
                        {copied === "gestures" ? (
                          <>
                            <Check className="h-4 w-4 text-green-400 animate-bounce" />
                            <span className="text-green-400 font-medium">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                            <span className="text-slate-300 group-hover/btn:text-white transition-colors">Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-slate-300 font-mono leading-relaxed">{codeExamples.gestures}</code>
                    </pre>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Gestos Suportados</h3>
                    <ul className="space-y-2 text-slate-300">
                      <li className="flex items-center space-x-2">
                        <span className="text-purple-400">•</span>
                        <span>
                          <strong>Pinch:</strong> Aproximar dedos
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-purple-400">•</span>
                        <span>
                          <strong>Swipe:</strong> Movimento de deslizar
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-purple-400">•</span>
                        <span>
                          <strong>Fist:</strong> Punho fechado
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-purple-400">•</span>
                        <span>
                          <strong>Point:</strong> Apontar com dedo
                        </span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <span className="text-purple-400">•</span>
                        <span>
                          <strong>Peace:</strong> Sinal de paz
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-semibold text-white mb-4">Configurações</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>
                        <strong>maxHands:</strong> Máximo de mãos (1-2)
                      </li>
                      <li>
                        <strong>minDetectionConfidence:</strong> Confiança mínima (0.0-1.0)
                      </li>
                      <li>
                        <strong>minTrackingConfidence:</strong> Tracking mínimo (0.0-1.0)
                      </li>
                      <li>
                        <strong>modelComplexity:</strong> Complexidade do modelo (0-1)
                      </li>
                      <li>
                        <strong>debug:</strong> Modo debug (true/false)
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            )}

            {/* Componentes */}
            {activeSection === "neuralgrid" && (
              <section className="animate-slide-up">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span className="text-2xl">🧩</span>
                  <span>Componentes</span>
                </h2>

                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  O NeuralCode oferece uma variedade de componentes prontos para uso, todos com suporte a gestos e
                  animações fluidas.
                </p>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                        JavaScript
                      </span>
                      <button
                        onClick={() => handleCopy(codeExamples.components, "components")}
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 hover:scale-105 group/btn"
                      >
                        {copied === "components" ? (
                          <>
                            <Check className="h-4 w-4 text-green-400 animate-bounce" />
                            <span className="text-green-400 font-medium">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                            <span className="text-slate-300 group-hover/btn:text-white transition-colors">Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-slate-300 font-mono leading-relaxed">{codeExamples.components}</code>
                    </pre>
                  </div>
                </div>
              </section>
            )}

            {/* Começo Rápido */}
            {activeSection === "quickstart" && (
              <section className="animate-slide-up">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                  <span className="text-2xl">⚡</span>
                  <span>Começo Rápido</span>
                </h2>

                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  Começe incluindo a produção rápida de CSS e Javascript via CDN da NeuralCode sem precisar de passo a
                  passo. Veja na prática com este{" "}
                  <a
                    href="#"
                    className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/50 hover:decoration-purple-300 transition-colors"
                  >
                    NeuralCode CodePen demo
                  </a>
                  .
                </p>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">1. Crie um novo arquivo HTML</h3>
                    <p className="text-slate-300 mb-6">
                      Crie um arquivo{" "}
                      <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">index.html</code>{" "}
                      na raiz do projeto. Inclua a tag{" "}
                      <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">
                        &lt;meta name="viewport"&gt;
                      </code>{" "}
                      para garantir a responsividade em dispositivos móveis.
                    </p>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-purple-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                            HTML
                          </span>
                          <button
                            onClick={() => handleCopy(codeExamples.basic, "basic")}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 hover:scale-105 group/btn"
                          >
                            {copied === "basic" ? (
                              <>
                                <Check className="h-4 w-4 text-green-400 animate-bounce" />
                                <span className="text-green-400 font-medium">Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                                <span className="text-slate-300 group-hover/btn:text-white transition-colors">
                                  Copiar
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code className="text-slate-300 font-mono leading-relaxed">{codeExamples.basic}</code>
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">2. Incluir CSS e JS da NeuralCode</h3>
                    <p className="text-slate-300 mb-6">
                      Adicione os links do CDN no seu HTML. Coloque o CSS no{" "}
                      <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">
                        &lt;head&gt;
                      </code>{" "}
                      e o JavaScript antes do fechamento do{" "}
                      <code className="bg-slate-800/80 px-3 py-1 rounded-lg text-purple-400 font-mono">
                        &lt;/body&gt;
                      </code>
                      .
                    </p>

                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-6 group-hover:border-blue-500/50 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-3 py-1 rounded-full">
                            HTML
                          </span>
                          <button
                            onClick={() => handleCopy(codeExamples.cdn, "cdn-quick")}
                            className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-sm transition-all duration-300 hover:scale-105 group/btn"
                          >
                            {copied === "cdn-quick" ? (
                              <>
                                <Check className="h-4 w-4 text-green-400 animate-bounce" />
                                <span className="text-green-400 font-medium">Copiado!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-4 w-4 text-slate-400 group-hover/btn:text-purple-400 transition-colors" />
                                <span className="text-slate-300 group-hover/btn:text-white transition-colors">
                                  Copiar
                                </span>
                              </>
                            )}
                          </button>
                        </div>
                        <pre className="text-sm overflow-x-auto">
                          <code className="text-slate-300 font-mono leading-relaxed">{codeExamples.cdn}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Sidebar Direita */}
        <div
          className={`hidden xl:block w-64 p-6 border-l border-slate-700/50 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <div className="sticky top-6">
            <h3 className="text-white font-semibold mb-6 text-lg">Nesta página</h3>
            <ul className="space-y-3 text-sm">
              {sidebarItems.map((item, index) => (
                <li key={item.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <button
                    onClick={() => setActiveItem(item.id)}
                    className={`text-left w-full transition-all duration-300 hover:translate-x-1 block py-1 ${
                      activeSection === item.id ? "text-purple-400 font-medium" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>

            <div
              className="mt-8 p-4 bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm rounded-xl border border-slate-700/50 animate-slide-up"
              style={{ animationDelay: "0.8s" }}
            >
              <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                <span className="text-lg">💡</span>
                <span>Dica Rápida</span>
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Use controles de gestos para navegar pela documentação sem usar as mãos!
              </p>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-xl border border-blue-500/20">
              <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
                <span className="text-lg">🚀</span>
                <span>Próximos Passos</span>
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Ver exemplos práticos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Explorar componentes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                    Configurar gestos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
