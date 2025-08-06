"use client"

import { useEffect, useRef } from "react"

export default function SimpleBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create only 2 subtle shapes
    const shapes = []
    for (let i = 0; i < 2; i++) {
      const shape = document.createElement("div")
      shape.className = "simple-shape"
      shape.style.cssText = `
        position: absolute;
        width: ${300 + Math.random() * 200}px;
        height: ${300 + Math.random() * 200}px;
        background: linear-gradient(45deg, 
          rgba(42, 125, 225, 0.02), 
          rgba(127, 0, 255, 0.02)
        );
        border-radius: 50%;
        filter: blur(20px);
        animation: simple-float ${25 + Math.random() * 10}s ease-in-out infinite;
      `
      
      shape.style.left = Math.random() * window.innerWidth + 'px'
      shape.style.top = Math.random() * window.innerHeight + 'px'
      
      containerRef.current.appendChild(shape)
      shapes.push(shape)
    }

    return () => {
      shapes.forEach((shape) => shape.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
