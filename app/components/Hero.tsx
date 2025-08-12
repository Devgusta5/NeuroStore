"use client";

import { useState, useEffect } from "react";
import { Copy, Check, Sparkles } from "lucide-react";

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const installCommand = "npm install NeuroStore@1.0.0";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl animate-float"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div
        className={`relative max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Security Update Banner */}
        <div
          className="mb-8 animate-slide-down"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 text-yellow-200 rounded-full text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform duration-300 cursor-pointer group">
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Get Security Updates for NeuroStore 1.0.0 →
          </div>
        </div>

        {/* Logo */}
        <div
          className="mb-8 animate-slide-down"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="relative inline-block">
            {/* Left Glow */}
            <div className="absolute left-[-48px] top-1/2 -translate-y-1/2 w-24 h-40 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse-glow pointer-events-none -z-10" />
            {/* Right Glow */}
            <div className="absolute right-[-48px] top-1/2 -translate-y-1/2 w-24 h-40 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse-glow pointer-events-none -z-10" />
            {/* Dark background behind logo */}
            <div className="absolute inset-0 w-40 h-40 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-purple-950 opacity-90 shadow-xl shadow-purple-900/40 -z-10" />
            <img
              src="/logo-nobg.png"
              alt="NeuroStore Logo"
              className="w-40 h-40 rounded-3xl mx-auto mb-6 transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-2xl shadow-purple-500/25"
            />
          </div>
        </div>

        {/* Title */}
        <h1
          className={`text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.6s" }}
        >
          Transforme ideias em experiências inteligentes
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            com o poder do NeuroStore
          </span>
        </h1>

        {/* Description */}
        <p
          className={` text-violet-600  text-xl md:text-2xl dark:text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "0.8s" }}
        >
          Uma biblioteca neural poderosa, versátil e cheia de recursos. Monte e
          costumize com
          <span className="text-purple-400  dark:text-purple-300 font-semibold ">
            {" "}
            controle de gestos
          </span>
          , utilize componentes de IA pré-prontos, e traga projetos a vida com
          plugins inteligentes de JavaScript.
        </p>

        {/* Install Command */}
        <div
          className={`flex flex-col md:flex-row gap-6 justify-center items-center mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "1s" }}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-xl p-4 font-mono text-left min-w-80 hover:border-purple-500/50 transition-all duration-300 group-hover:scale-105">
              <div className="flex items-center justify-between">
                <span className="text-green-400">$ </span>
                <span className="text-slate-200 flex-1 ml-2">
                  {installCommand}
                </span>
                <button
                  onClick={handleCopy}
                  className="ml-4 p-2 hover:bg-slate-700/50 rounded-lg transition-all duration-300 hover:scale-110 group"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-400 animate-bounce" />
                  ) : (
                    <Copy className="h-4 w-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group overflow-hidden">
            <span className="relative z-10 flex items-center">
              📖 Ler documentação
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </button>
        </div>

        {/* Version Info */}
        <div
          className={`text-slate-400 text-sm mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "1.2s" }}
        >
          Atualmente{" "}
          <span className="text-white font-semibold bg-slate-800/50 px-2 py-1 rounded">
            v1.0.0
          </span>{" "}
          •
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 ml-1 transition-colors hover:underline"
          >
            Download
          </a>{" "}
          •
          <a
            href="#"
            className="text-purple-400 hover:text-purple-300 ml-1 transition-colors hover:underline"
          >
            Todas as versões
          </a>
        </div>

        {/* Gesture Control Indicator */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ animationDelay: "1.4s" }}
        >
          <div className="inline-flex items-center space-x-4 px-6 py-3 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 rounded-xl hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
              Ativar controle por gesto
            </span>
            <div className="flex space-x-2 text-lg">
              <span className="hover:scale-125 transition-transform duration-300 cursor-pointer">
                ✋
              </span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-pointer">
                👆
              </span>
              <span className="hover:scale-125 transition-transform duration-300 cursor-pointer">
                ✊
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
