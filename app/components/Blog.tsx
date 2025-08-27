"use client"

import { useState } from "react"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Code,
  ImageIcon,
  Send,
  Search,
  CheckCircle,
  Star,
  Eye,
  ArrowUp,
  ReplyIcon,
  CopyIcon,
  Check,
} from "lucide-react"

interface Thread {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
    reputation: number
  }
  content: string
  code?: string
  language?: string
  images?: string[]
  timestamp: string
  likes: number
  replies: number
  views: number
  bookmarks: number
  tags: string[]
  isLiked: boolean
  isBookmarked: boolean
  category: "question" | "showcase" | "discussion" | "help"
}

interface ThreadReply {
  id: string
  threadId: string
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
    reputation: number
  }
  content: string
  code?: string
  language?: string
  timestamp: string
  likes: number
  isLiked: boolean
  isAccepted?: boolean
}

const mockThreads: Thread[] = [
  {
    id: "1",
    author: {
      name: "Ana Silva",
      username: "anadev",
      avatar: "/developer-woman.png",
      verified: true,
      reputation: 2847,
    },
    content:
      "Consegui implementar reconhecimento de gestos com NeuralCode! 🎉 Aqui está minha implementação para controlar um player de música com gestos da mão. Funciona perfeitamente!",
    code: `import { NeuralCode } from 'neuralcode'

const musicPlayer = new NeuralCode({
  gestures: true,
  handTracking: {
    maxHands: 1,
    minDetectionConfidence: 0.8
  }
})

musicPlayer.on('swipe-right', () => {
  audio.nextTrack()
})

musicPlayer.on('swipe-left', () => {
  audio.previousTrack()
})

musicPlayer.on('fist', () => {
  audio.togglePlay()
})`,
    language: "javascript",
    timestamp: "2h",
    likes: 42,
    replies: 8,
    views: 156,
    bookmarks: 12,
    tags: ["gestures", "music", "javascript"],
    isLiked: false,
    isBookmarked: true,
    category: "showcase",
  },
  {
    id: "2",
    author: {
      name: "Carlos Santos",
      username: "carlosjs",
      avatar: "/developer-man.png",
      verified: false,
      reputation: 1203,
    },
    content:
      "Como posso melhorar a precisão do hand tracking? Estou tendo problemas com detecção em ambientes com pouca luz. Alguém já passou por isso?",
    timestamp: "4h",
    likes: 15,
    replies: 12,
    views: 89,
    bookmarks: 3,
    tags: ["help", "handtracking", "troubleshooting"],
    isLiked: true,
    isBookmarked: false,
    category: "question",
  },
  {
    id: "3",
    author: {
      name: "Marina Costa",
      username: "marinaui",
      avatar: "/stylish-woman.png",
      verified: true,
      reputation: 3421,
    },
    content:
      "Criei uma interface de dashboard que responde a gestos! Os usuários podem navegar entre gráficos apenas movimentando as mãos. A experiência é incrível! 🚀",
    images: ["/general-dashboard-interface.png"],
    timestamp: "6h",
    likes: 67,
    replies: 15,
    views: 234,
    bookmarks: 28,
    tags: ["ui", "dashboard", "gestures", "showcase"],
    isLiked: false,
    isBookmarked: false,
    category: "showcase",
  },
  {
    id: "4",
    author: {
      name: "Pedro Oliveira",
      username: "pedrodev",
      avatar: "/developer-man-glasses.png",
      verified: false,
      reputation: 892,
    },
    content:
      "Discussão: Qual a melhor abordagem para implementar gestos customizados? Estou pensando em criar um sistema de treinamento de gestos para minha aplicação.",
    timestamp: "8h",
    likes: 23,
    replies: 18,
    views: 145,
    bookmarks: 7,
    tags: ["discussion", "custom-gestures", "training"],
    isLiked: false,
    isBookmarked: false,
    category: "discussion",
  },
]

const mockReplies: ThreadReply[] = [
  {
    id: "r1",
    threadId: "1",
    author: {
      name: "João Tech",
      username: "joaotech",
      avatar: "/developer-working.png",
      verified: false,
      reputation: 567,
    },
    content: "Muito legal! Você testou com diferentes tipos de música? Gestos podem variar dependendo do ritmo.",
    timestamp: "1h",
    likes: 5,
    isLiked: false,
  },
  {
    id: "r2",
    threadId: "2",
    author: {
      name: "Tech Expert",
      username: "techexpert",
      avatar: "/expert-consultation.png",
      verified: true,
      reputation: 4521,
    },
    content:
      "Para ambientes com pouca luz, recomendo aumentar o `minDetectionConfidence` para 0.9 e usar iluminação infravermelha se possível.",
    code: `const neural = new NeuralCode({
  handTracking: {
    minDetectionConfidence: 0.9,
    modelComplexity: 1 // Usar modelo mais complexo
  }
})`,
    language: "javascript",
    timestamp: "3h",
    likes: 12,
    isLiked: true,
    isAccepted: true,
  },
]

export default function Blog() {
  const [threads, setThreads] = useState<Thread[]>(mockThreads)
  const [replies, setReplies] = useState<ThreadReply[]>(mockReplies)
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null)
  const [newThreadContent, setNewThreadContent] = useState("")
  const [newReplyContent, setNewReplyContent] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<"all" | "question" | "showcase" | "discussion" | "help">("all")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">("recent")
  const [showNewThread, setShowNewThread] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleLike = (threadId: string) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isLiked: !thread.isLiked,
              likes: thread.isLiked ? thread.likes - 1 : thread.likes + 1,
            }
          : thread,
      ),
    )
  }

  const handleBookmark = (threadId: string) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isBookmarked: !thread.isBookmarked,
              bookmarks: thread.isBookmarked ? thread.bookmarks - 1 : thread.bookmarks + 1,
            }
          : thread,
      ),
    )
  }

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredThreads = threads.filter((thread) => {
    const matchesSearch =
      thread.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thread.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesFilter = activeFilter === "all" || thread.category === activeFilter
    return matchesSearch && matchesFilter
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "question":
        return "❓"
      case "showcase":
        return "🚀"
      case "discussion":
        return "💬"
      case "help":
        return "🆘"
      default:
        return "📝"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "question":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "showcase":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "discussion":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "help":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
            Neural Threads
          </h1>
          <p className="text-xl text-slate-300 mb-8">Compartilhe códigos, tire dúvidas e conecte-se com a comunidade</p>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar threads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/50 text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-slate-700/50 focus:border-purple-400/50 transition-all duration-300"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Category Filters */}
              <div className="flex items-center space-x-2">
                {["all", "question", "showcase", "discussion", "help"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeFilter === filter
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50"
                    }`}
                  >
                    {filter === "all" ? "Todos" : filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-800/50 text-white border border-slate-700/50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400/50"
              >
                <option value="recent">Recentes</option>
                <option value="popular">Populares</option>
                <option value="trending">Trending</option>
              </select>
            </div>
          </div>

          {/* New Thread Button */}
          <button
            onClick={() => setShowNewThread(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            + Nova Thread
          </button>
        </div>

        {/* Threads List */}
        <div className="space-y-6">
          {filteredThreads.map((thread) => (
            <div
              key={thread.id}
              className="bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
            >
              {/* Thread Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={thread.author.avatar || "/placeholder.svg"}
                    alt={thread.author.name}
                    className="w-12 h-12 rounded-full border-2 border-slate-600"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-semibold">{thread.author.name}</h3>
                      {thread.author.verified && <CheckCircle className="h-4 w-4 text-blue-400" />}
                      <span className="text-slate-400 text-sm">@{thread.author.username}</span>
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Star className="h-3 w-3" />
                        <span>{thread.author.reputation}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-slate-400 text-sm">{thread.timestamp}</span>
                      <span className={`px-2 py-1 rounded-full text-xs border ${getCategoryColor(thread.category)}`}>
                        {getCategoryIcon(thread.category)} {thread.category}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="text-slate-400 hover:text-white transition-colors">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              {/* Thread Content */}
              <div className="mb-4">
                <p className="text-slate-300 leading-relaxed mb-4">{thread.content}</p>

                {/* Code Block */}
                {thread.code && (
                  <div className="relative group/code">
                    <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-slate-400 text-sm font-mono bg-slate-700/50 px-2 py-1 rounded">
                          {thread.language}
                        </span>
                        <button
                          onClick={() => handleCopyCode(thread.code!, `thread-${thread.id}`)}
                          className="flex items-center space-x-1 px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-xs transition-all duration-300 opacity-0 group-hover/code:opacity-100"
                        >
                          {copiedCode === `thread-${thread.id}` ? (
                            <>
                              <Check className="h-3 w-3 text-green-400" />
                              <span className="text-green-400">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <CopyIcon className="h-3 w-3 text-slate-400" />
                              <span className="text-slate-300">Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-sm overflow-x-auto">
                        <code className="text-slate-300 font-mono leading-relaxed">{thread.code}</code>
                      </pre>
                    </div>
                  </div>
                )}

                {/* Images */}
                {thread.images && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {thread.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Thread image ${index + 1}`}
                        className="rounded-xl border border-slate-700/50 hover:border-purple-500/50 transition-colors cursor-pointer"
                      />
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {thread.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-full text-sm hover:bg-purple-600/20 hover:text-purple-300 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Thread Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(thread.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      thread.isLiked ? "text-red-400" : "text-slate-400 hover:text-red-400"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${thread.isLiked ? "fill-current" : ""}`} />
                    <span className="text-sm">{thread.likes}</span>
                  </button>

                  <button
                    onClick={() => setSelectedThread(thread)}
                    className="flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-sm">{thread.replies}</span>
                  </button>

                  <div className="flex items-center space-x-2 text-slate-400">
                    <Eye className="h-5 w-5" />
                    <span className="text-sm">{thread.views}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleBookmark(thread.id)}
                    className={`transition-colors ${
                      thread.isBookmarked ? "text-yellow-400" : "text-slate-400 hover:text-yellow-400"
                    }`}
                  >
                    <Bookmark className={`h-5 w-5 ${thread.isBookmarked ? "fill-current" : ""}`} />
                  </button>

                  <button className="text-slate-400 hover:text-slate-300 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thread Detail Modal */}
        {selectedThread && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700/50 max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <h3 className="text-xl font-semibold text-white">Thread Completa</h3>
                <button
                  onClick={() => setSelectedThread(null)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {/* Original Thread */}
                <div className="mb-8">{/* Thread content would be repeated here */}</div>

                {/* Replies */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white mb-4">
                    Respostas ({replies.filter((r) => r.threadId === selectedThread.id).length})
                  </h4>

                  {replies
                    .filter((reply) => reply.threadId === selectedThread.id)
                    .map((reply) => (
                      <div
                        key={reply.id}
                        className={`bg-slate-700/30 rounded-xl p-4 border-l-4 ${
                          reply.isAccepted ? "border-green-400" : "border-slate-600"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <img
                              src={reply.author.avatar || "/placeholder.svg"}
                              alt={reply.author.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-white font-medium">{reply.author.name}</span>
                                {reply.author.verified && <CheckCircle className="h-3 w-3 text-blue-400" />}
                                {reply.isAccepted && (
                                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                                    ✓ Aceita
                                  </span>
                                )}
                              </div>
                              <span className="text-slate-400 text-sm">{reply.timestamp}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-slate-300 mb-3">{reply.content}</p>

                        {reply.code && (
                          <div className="bg-slate-900/50 rounded-lg p-3 mb-3">
                            <pre className="text-sm overflow-x-auto">
                              <code className="text-slate-300 font-mono">{reply.code}</code>
                            </pre>
                          </div>
                        )}

                        <div className="flex items-center space-x-4">
                          <button className="flex items-center space-x-1 text-slate-400 hover:text-red-400 transition-colors">
                            <ArrowUp className="h-4 w-4" />
                            <span className="text-sm">{reply.likes}</span>
                          </button>
                          <button className="text-slate-400 hover:text-blue-400 transition-colors">
                            <ReplyIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                {/* New Reply */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <textarea
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Escreva sua resposta..."
                    className="w-full bg-slate-700/50 text-white placeholder-slate-400 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-slate-600/50"
                    rows={4}
                  />
                  <div className="flex justify-end mt-4">
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Thread Modal */}
        {showNewThread && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-800 rounded-2xl border border-slate-700/50 max-w-2xl w-full">
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <h3 className="text-xl font-semibold text-white">Nova Thread</h3>
                <button
                  onClick={() => setShowNewThread(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <textarea
                  value={newThreadContent}
                  onChange={(e) => setNewThreadContent(e.target.value)}
                  placeholder="Compartilhe seu código, dúvida ou descoberta..."
                  className="w-full bg-slate-700/50 text-white placeholder-slate-400 p-4 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 border border-slate-600/50 mb-4"
                  rows={6}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors">
                      <Code className="h-5 w-5" />
                      <span>Código</span>
                    </button>
                    <button className="flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors">
                      <ImageIcon className="h-5 w-5" />
                      <span>Imagem</span>
                    </button>
                  </div>

                  <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                    <Send className="h-4 w-4" />
                    <span>Publicar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
