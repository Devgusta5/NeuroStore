"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function MorphingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create morphing shapes
    const shapes = []
    for (let i = 0; i < 5; i++) {
      const shape = document.createElement("div")
      shape.className = "morphing-shape"
      shape.style.cssText = `
        position: absolute;
        width: ${200 + Math.random() * 300}px;
        height: ${200 + Math.random() * 300}px;
        background: linear-gradient(45deg, 
          rgba(42, 125, 225, 0.1), 
          rgba(127, 0, 255, 0.1), 
          rgba(76, 42, 133, 0.1)
        );
        border-radius: 50%;
        filter: blur(40px);
        animation: morph ${10 + Math.random() * 10}s ease-in-out infinite;
      `
      containerRef.current.appendChild(shape)
      shapes.push(shape)
    }

    // Animate shapes
    shapes.forEach((shape, index) => {
      gsap.set(shape, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        scale: 0.5 + Math.random() * 0.5,
      })

      gsap.to(shape, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        scale: 0.3 + Math.random() * 0.7,
        duration: 15 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 2,
      })
    })

    return () => {
      shapes.forEach((shape) => shape.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
