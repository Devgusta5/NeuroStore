"use client"

import { Copy, Zap, RefreshCw } from "lucide-react"

const features = [
  {
    icon: Copy,
    title: "Cópia & Cola Instantâneos",
    description: "Códigos prontos para usar em seus projetos sem configuração adicional",
    color: "text-cyber-purple",
  },
  {
    icon: Zap,
    title: "Snippets Prontos para Produção",
    description: "Todos os códigos são testados e otimizados para ambientes de produção",
    color: "text-neon-blue",
  },
  {
    icon: RefreshCw,
    title: "Atualizações Mensais de Modelos",
    description: "Biblioteca sempre atualizada com os modelos mais recentes do mercado",
    color: "text-indigo",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-orbitron mb-4 text-white">Por que escolher o NeuralCode?</h2>
          <p className="text-xl text-gray-300">A plataforma mais completa para desenvolvedores de IA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group text-center p-8 rounded-xl bg-gradient-to-b from-charcoal/50 to-black border border-indigo/20 hover:border-cyber-purple/50 transition-all duration-300"
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-r from-charcoal to-indigo/20 group-hover:from-cyber-purple/20 group-hover:to-neon-blue/20 transition-all duration-300">
                    <Icon
                      className={`h-12 w-12 ${feature.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 font-orbitron">{feature.title}</h3>

                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
