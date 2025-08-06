"use client"

import { useRef } from "react"

const plans = [
	{
		name: "Iniciante Quântico",
		price: "R$ 0",
		period: "/mês",
		features: [
			"5 códigos básicos",
			"Suporte da comunidade",
			"Documentação padrão",
		],
		color: "#4C2A85",
		popular: false,
	},
	{
		name: "Desenvolvedor Neural",
		price: "R$ 49",
		period: "/mês",
		features: [
			"Códigos ilimitados",
			"IA assistente",
			"Suporte prioritário",
			"Controle por gestos",
		],
		color: "#2A7DE1",
		popular: true,
	},
	{
		name: "Mestre Quântico",
		price: "R$ 149",
		period: "/mês",
		features: [
			"Tudo do Neural",
			"Códigos exclusivos",
			"Consultoria 1:1",
			"Acesso beta",
		],
		color: "#7F00FF",
		popular: false,
	},
]

export default function QuantumPricing() {
	const sectionRef = useRef<HTMLDivElement>(null)

	return (
		<section ref={sectionRef} className="py-20 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-16">
					<h2 className="text-5xl font-bold font-orbitron mb-6 holographic-text">
						PLANOS QUÂNTICOS
					</h2>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`pricing-card relative transition-all duration-1000 opacity-0 translate-y-8 will-change-transform will-change-opacity fadein-on-scroll ${
								plan.popular ? "scale-105" : ""
							}`}
						>
							<div className="relative p-8 glass-effect rounded-2xl border border-gray-700/50 hover:border-neon-blue/50 transition-all duration-500">
								{plan.popular && (
									<div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
										<div className="bg-gradient-to-r from-neon-blue to-cyber-purple px-4 py-2 rounded-full text-sm font-bold">
											MAIS POPULAR
										</div>
									</div>
								)}

								<div className="text-center mb-8">
									<h3 className="text-2xl font-bold text-white mb-4 font-orbitron">
										{plan.name}
									</h3>
									<div className="flex items-baseline justify-center">
										<span className="text-5xl font-bold text-white">
											{plan.price}
										</span>
										<span className="text-gray-300 ml-2">
											{plan.period}
										</span>
									</div>
								</div>

								<ul className="space-y-4 mb-8">
									{plan.features.map((feature, featureIndex) => (
										<li
											key={featureIndex}
											className="flex items-center space-x-3"
										>
											<div className="w-2 h-2 bg-neon-blue rounded-full"></div>
											<span className="text-gray-300">{feature}</span>
										</li>
									))}
								</ul>

								<button className="quantum-btn primary w-full">
									<span className="btn-text">ESCOLHER PLANO</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}

// Adicione o seguinte CSS globalmente ou via Tailwind safelist:
// .fadein-on-scroll { opacity: 1 !important; transform: none !important; transition: opacity 1s, transform 1s; }
