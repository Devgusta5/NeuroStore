"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Star, Zap, Sparkles, Crown, Rocket, Shield, Users, Code, Cpu } from "lucide-react"

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
			"Templates iniciais",
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
			"Analytics detalhados",
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
			"Backup e segurança avançada",
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
		description: "Biblioteca completa de algoritmos de IA",
	},
	{
		icon: Zap,
		title: "Performance Extrema",
		description: "Otimizado para máxima velocidade",
	},
	{
		icon: Shield,
		title: "Segurança Avançada",
		description: "Proteção enterprise-grade",
	},
	{
		icon: Users,
		title: "Comunidade Ativa",
		description: "Milhares de desenvolvedores",
	},
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
			{ threshold: 0.1 },
		)

		if (sectionRef.current) {
			observer.observe(sectionRef.current)
		}

		return () => observer.disconnect()
	}, [])

	return (
		<section ref={sectionRef} className="py-20 px-4 relative bg-slate-950">
			{/* Minimal background */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-900/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
			</div>

			<div className="max-w-5xl mx-auto relative">
				{/* Header */}
				<div
					className={`text-center mb-14 transition-all duration-1000 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					<div className="inline-flex items-center px-4 py-2 bg-slate-800/60 border border-slate-700 text-purple-200 rounded-full text-xs font-medium mb-4">
						<Sparkles className="w-4 h-4 mr-2" />
						Planos Neurais Avançados
					</div>
					<h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
						Escolha Seu Poder Neural
					</h2>
					<p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
						Desbloqueie todo o potencial da inteligência artificial com nossos planos personalizados
					</p>
				</div>

				{/* Features Grid */}
				<div
					className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 transition-all duration-1000 ${
						isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
					}`}
				>
					{features.map((feature, index) => {
						const Icon = feature.icon
						return (
							<div
								key={index}
								className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center hover:border-purple-500 transition-colors"
							>
								<div className="w-9 h-9 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-2">
									<Icon className="h-5 w-5 text-white" />
								</div>
								<h3 className="text-white font-medium text-base mb-1">{feature.title}</h3>
								<p className="text-slate-400 text-xs">{feature.description}</p>
							</div>
						)
					})}
				</div>

				{/* Pricing Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{plans.map((plan, index) => {
						const Icon = plan.icon
						const isHovered = hoveredPlan === index

						return (
							<div
								key={index}
								onMouseEnter={() => setHoveredPlan(index)}
								onMouseLeave={() => setHoveredPlan(null)}
								className={`relative group transition-all duration-400 ${
									isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
								} ${plan.popular ? 'md:scale-105 md:-translate-y-2' : ''} ${
									isHovered ? 'scale-105 -translate-y-1' : ''
								}`}
							>
								{/* Popular/Premium Badge */}
								{(plan.popular || plan.premium) && (
									<div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
										<div className={`px-4 py-1 rounded-full text-xs font-bold flex items-center space-x-2 shadow-sm ${
											plan.popular
												? "bg-purple-700 text-white"
												: "bg-cyan-700 text-white"
										}`}>
											{plan.popular && <Star className="h-3 w-3" />}
											{plan.premium && <Crown className="h-3 w-3" />}
											<span>{plan.popular ? "MAIS POPULAR" : "ENTERPRISE"}</span>
										</div>
									</div>
								)}

								{/* Main Card */}
								<div className="relative bg-slate-800 border border-slate-700 rounded-xl p-7 flex flex-col h-full">
									{/* Plan Icon */}
									<div className="text-center mb-5">
										<div className="w-12 h-12 bg-slate-700 rounded-xl flex items-center justify-center mx-auto mb-3">
											<Icon className="h-7 w-7 text-white" />
										</div>
										<h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
										<p className="text-slate-400 mb-4 text-sm">{plan.description}</p>
										{/* Price */}
										<div className="flex items-baseline justify-center mb-2">
											<span className="text-3xl font-bold text-white">{plan.price}</span>
											<span className="text-slate-400 ml-1 text-base">{plan.period}</span>
										</div>
									</div>
									{/* Features */}
									<ul className="space-y-2 mb-6 flex-1">
										{plan.features.slice(0, 6).map((feature, featureIndex) => (
											<li
												key={featureIndex}
												className="flex items-center space-x-2"
											>
												<Check className="h-4 w-4 text-green-400" />
												<span className="text-slate-300 text-sm">{feature}</span>
											</li>
										))}
										{plan.features.length > 6 && (
											<li className="text-slate-400 text-xs pl-6">+{plan.features.length - 6} recursos</li>
										)}
									</ul>
									{/* CTA Button */}
									<button className={`w-full py-3 rounded-lg font-semibold text-base transition-all duration-200 ${
										plan.popular
											? 'bg-purple-700 text-white hover:bg-purple-600'
											: plan.premium
												? 'bg-cyan-700 text-white hover:bg-cyan-600'
												: 'bg-slate-700 text-white hover:bg-slate-600'
									}`}>
										<span className="flex items-center justify-center space-x-2">
											<span>{plan.buttonText}</span>
											{plan.popular && <Zap className="h-4 w-4" />}
											{plan.premium && <Crown className="h-4 w-4" />}
										</span>
									</button>
								</div>
							</div>
						)
					})}
				</div>

				{/* Bottom CTA */}
				<div className={`text-center transition-all duration-1000 ${
					isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}>
					<div className="bg-slate-800 border border-slate-700 rounded-xl p-7 max-w-xl mx-auto">
						<h3 className="text-lg font-bold text-white mb-2">Precisa de algo personalizado?</h3>
						<p className="text-slate-300 mb-4 text-sm">
							Entre em contato conosco para soluções enterprise customizadas e preços especiais para grandes equipes.
						</p>
						<button className="bg-slate-700 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200">
							Falar com Especialista
						</button>
					</div>
				</div>

				{/* Money Back Guarantee */}
				<div className={`text-center mt-8 transition-all duration-1000 ${
					isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
				}`}>
					<div className="inline-flex items-center space-x-2 text-slate-400 text-sm">
						<Shield className="h-4 w-4 text-green-400" />
						<span>Garantia de 30 dias • Cancele quando quiser • Suporte 24/7</span>
					</div>
				</div>
			</div>
		</section>
	)
}
