"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Star, Zap, Sparkles, Crown, Rocket, Shield, Users, Code, Cpu } from 'lucide-react'

const plans = [
  {
    name: "Neural Starter",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar sua jornada neural",
    features: [
      "5 downloads por mês",
      "Códigos básicos de IA",
      "Suporte da comunidade",
      "Documentação completa",
      "Gestos básicos",
      "Templates iniciais"
    ],
    buttonText: "Começar Grátis",
    popular: false,
    icon: Rocket,
    gradient: "from-slate-600 to-slate-800",
    borderGradient: "from-slate-500 to-slate-700",
    glowColor: "slate-400",
  },
  {
    name: "Neural Pro",
    price: "R$ 29",
    period: "/mês",
    description: "Para desenvolvedores que querem mais poder",
    features: [
      "Downloads ilimitados",
      "Códigos avançados de IA",
      "Suporte prioritário 24/7",
      "Modelos customizados",
      "API de integração completa",
      "Atualizações em tempo real",
      "Gestos avançados",
      "Analytics detalhados"
    ],
    buttonText: "Escolher Pro",
    popular: true,
    icon: Cpu,
    gradient: "from-purple-600 to-blue-600",
    borderGradient: "from-purple-500 to-blue-500",
    glowColor: "purple-400",
  },
  {
    name: "Neural Enterprise",
    price: "R$ 99",
    period: "/mês",
    description: "Para equipes que precisam do máximo",
    features: [
      "Tudo do Pro incluído",
      "Códigos exclusivos enterprise",
      "Suporte dedicado 24/7",
      "Consultoria técnica especializada",
      "Treinamento personalizado",
      "SLA garantido 99.9%",
      "Integração empresarial",
      "White-label disponível",
      "Backup e segurança avançada"
    ],
    buttonText: "Escolher Enterprise",
    popular: false,
    premium: true,
    icon: Crown,
    gradient: "from-cyan-500 to-purple-600",
    borderGradient: "from-cyan-400 to-purple-500",
    glowColor: "cyan-400",
  },
]

const features = [
  {
    icon: Code,
    title: "Códigos Neurais",
    description: "Biblioteca completa de algoritmos de IA"
  },
  {
    icon: Zap,
    title: "Performance Extrema",
    description: "Otimizado para máxima velocidade"
  },
  {
    icon: Shield,
    title: "Segurança Avançada",
    description: "Proteção enterprise-grade"
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Milhares de desenvolvedores"
  }
]

export default function PricingPlans() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400/5 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-purple-200 rounded-full text-sm font-medium backdrop-blur-sm mb-6 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
            Planos Neurais Avançados
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
            Escolha Seu Poder Neural
          </h2>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Desbloqueie todo o potencial da inteligência artificial com nossos planos personalizados
          </p>
        </div>

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '0.2s' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const isHovered = hoveredPlan === index
            
            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredPlan(index)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative group transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${
                  plan.popular ? 'lg:scale-110 lg:-translate-y-4' : ''
                } ${
                  isHovered ? 'scale-105 -translate-y-2' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${plan.borderGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                {/* Main Card */}
                <div className={`relative bg-slate-800/50 backdrop-blur-md border-2 rounded-2xl p-8 h-full transition-all duration-500 ${
                  plan.popular 
                    ? `border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-slate-800/50 shadow-2xl shadow-purple-500/20` 
                    : plan.premium
                      ? `border-cyan-500/50 bg-gradient-to-b from-cyan-500/10 to-slate-800/50 shadow-2xl shadow-cyan-500/20`
                      : `border-slate-600/50 hover:border-purple-500/50 group-hover:bg-gradient-to-b group-hover:from-purple-500/5 group-hover:to-slate-800/50`
                }`}>
                  
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg animate-pulse-glow">
                        <Star className="h-4 w-4 animate-spin" />
                        <span>MAIS POPULAR</span>
                      </div>
                    </div>
                  )}

                  {/* Premium Badge */}
                  {plan.premium && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-2 shadow-lg">
                        <Crown className="h-4 w-4" />
                        <span>ENTERPRISE</span>
                      </div>
                    </div>
                  )}

                  {/* Plan Icon */}
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2 font-orbitron group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 group-hover:bg-clip-text transition-all duration-300">
                      {plan.name}
                    </h3>
                    <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="flex items-baseline justify-center mb-8">
                      <span className="text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 group-hover:bg-clip-text transition-all duration-300">
                        {plan.price}
                      </span>
                      <span className="text-slate-400 ml-2 text-lg">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-1">
                    {plan.features.map((feature, featureIndex) => (
                      <li 
                        key={featureIndex} 
                        className="flex items-start space-x-3 group/item"
                        style={{ animationDelay: `${featureIndex * 0.1}s` }}
                      >
                        <div className="flex-shrink-0 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-slate-300 group-hover/item:text-white transition-colors duration-300 leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 relative overflow-hidden group/btn ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-purple-500/25'
                      : plan.premium
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 shadow-lg hover:shadow-cyan-500/25'
                        : 'border-2 border-slate-600 text-slate-300 hover:border-purple-500 hover:text-white hover:bg-gradient-to-r hover:from-purple-600/20 hover:to-blue-600/20'
                  } hover:scale-105 hover:shadow-2xl`}>
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>{plan.buttonText}</span>
                      {plan.popular && <Zap className="h-4 w-4 animate-pulse" />}
                      {plan.premium && <Crown className="h-4 w-4" />}
                    </span>
                    
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                  </button>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${plan.borderGradient} rounded-full animate-float-particle`}
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

        {/* Bottom CTA */}
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '0.8s' }}>
          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-2xl mx-auto hover:border-purple-500/50 transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-4">Precisa de algo personalizado?</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Entre em contato conosco para soluções enterprise customizadas e preços especiais para grandes equipes.
            </p>
            <button className="bg-gradient-to-r from-slate-600 to-slate-800 hover:from-purple-600 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Falar com Especialista
            </button>
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className={`text-center mt-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ animationDelay: '1s' }}>
          <div className="inline-flex items-center space-x-2 text-slate-400">
            <Shield className="h-5 w-5 text-green-400" />
            <span>Garantia de 30 dias • Cancele quando quiser • Suporte 24/7</span>
          </div>
        </div>
      </div>
    </section>
  )
}
