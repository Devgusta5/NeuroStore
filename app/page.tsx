"use client"

import { useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "./components/Navbar"
import HeroAdvanced from "./components/HeroAdvanced"
import NeuralGrid from "./components/NeuralGrid"
import HolographicFeatures from "./components/HolographicFeatures"
import QuantumPricing from "./components/QuantumPricing"
import Footer from "./components/Footer"
import GestureController from "./components/GestureController"
import ParticleField from "./components/ParticleField"
import MorphingBackground from "./components/MorphingBackground"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  useEffect(() => {
    // Initialize GSAP animations
    gsap.set("body", { overflow: "hidden" })

    gsap.to("body", {
      overflow: "auto",
      duration: 0.1,
      delay: 1,
    })

    // Page load animation
    const tl = gsap.timeline()
    tl.from(".page-loader", {
      scale: 0,
      rotation: 360,
      duration: 1,
      ease: "back.out(1.7)",
    })
      .to(".page-loader", {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        delay: 0.5,
      })
      .set(".page-loader", { display: "none" })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* Page Loader */}
      <div className="page-loader fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="neural-loader">
          <div className="neural-core"></div>
          <div className="neural-ring"></div>
          <div className="neural-ring-2"></div>
        </div>
      </div>

      {/* Background Effects */}
      <MorphingBackground />
      <ParticleField />

      {/* Gesture Controller */}
      <GestureController />

      {/* Main Content */}
      <Navbar />
      <HeroAdvanced />
      <NeuralGrid />
      <HolographicFeatures />
      <QuantumPricing />
      <Footer />
    </div>
  )
}
