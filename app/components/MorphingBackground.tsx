"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function MorphingBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create morphing shapes
    const shapes: HTMLDivElement[] = []
    for (let i = 0; i < 2; i++) {
      const shape = document.createElement("div")
      shape.className = "morphing-shape"
      shape.style.cssText = `
        position: absolute;
        width: ${200 + Math.random() * 300}px;
        height: ${200 + Math.random() * 300}px;
        background: linear-gradient(45deg, 
          rgba(42, 125, 225, 0.03), 
          rgba(127, 0, 255, 0.03), 
          rgba(76, 42, 133, 0.03)
        );
        border-radius: 50%;
        filter: blur(20px);
        animation: morph ${20 + Math.random() * 10}s ease-in-out infinite;
      `
      containerRef.current.appendChild(shape)
      shapes.push(shape)
    }

    // Animate shapes
    shapes.forEach((shape, index) => {
      gsap.set(shape, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      })

      gsap.to(shape, {
        x: `+=${Math.random() * 400 - 200}`,
        y: `+=${Math.random() * 400 - 200}`,
        duration: 30 + Math.random() * 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 5,
      })
    })

    return () => {
      shapes.forEach((shape) => shape.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
