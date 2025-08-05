"use client"

import { Check, Star, Zap } from "lucide-react"

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    features: ["5 downloads por mês", "Códigos básicos", "Suporte da comunidade", "Documentação completa"],
    buttonText: "Começar Grátis",
    buttonStyle: "border-2 border-indigo text-indigo hover:bg-indigo hover:text-white",
    popular: false,
  },
  {
    name: "Pro",
    price: "R$ 29",
    period: "/mês",
    description: "Para desenvolvedores profissionais",
    features: [
      "Downloads ilimitados",
      "Códigos avançados",
      "Suporte prioritário",
      "Modelos customizados",
      "API de integração",
      "Atualizações em tempo real",
    ],
    buttonText: "Escolher Pro",
    buttonStyle: "bg-neon-blue text-black hover:bg-cyber-purple hover:shadow-lg hover:shadow-neon-blue/50",
    popular: true,
  },
  {
    name: "Premium",
    price: "R$ 99",
    period: "/mês",
    description: "Para equipes e empresas",
    features: [
      "Tudo do Pro",
      "Códigos exclusivos",
      "Suporte 24/7",
      "Consultoria técnica",
      "Treinamento personalizado",
      "SLA garantido",
      "Integração empresarial",
    ],
    buttonText: "Escolher Premium",
    buttonStyle:
      "bg-gradient-to-r from-cyber-purple to-neon-blue text-white hover:shadow-lg hover:shadow-cyber-purple/50",
    popular: false,
    premium: true,
  },
]

export default function PricingPlans() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-charcoal to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-orbitron mb-4 text-white">Planos de Assinatura</h2>
          <p className="text-xl text-gray-300">Escolha o plano ideal para suas necessidades</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 border transition-all duration-300 ${
                plan.popular
                  ? "border-neon-blue bg-gradient-to-b from-neon-blue/10 to-charcoal scale-105 shadow-lg shadow-neon-blue/20"
                  : plan.premium
                    ? "border-cyber-purple bg-gradient-to-b from-cyber-purple/10 to-charcoal"
                    : "border-indigo/20 bg-charcoal hover:border-indigo/40"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-neon-blue text-black px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>MAIS POPULAR</span>
                  </div>
                </div>
              )}

              {plan.premium && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyber-purple to-neon-blue text-white px-4 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Zap className="h-4 w-4" />
                    <span>PREMIUM</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-300 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
