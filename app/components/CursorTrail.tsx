"use client"

import { useEffect, useRef } from "react"

const colors = [
  "#8b5cf6", // violet-500
  "#7c3aed", // violet-600
  "#6d28d9", // violet-700
  "#5b21b6", // violet-800
  "#4c1d95", // violet-900
  "#312e81", // indigo-900
  "#1e1b4b", // indigo-950
  "#1f2937", // gray-800
  "#111827", // gray-900
  "#0f172a", // slate-900
  "#000000", // black
]

interface Circle extends HTMLDivElement {
  x: number
  y: number
}

export default function CursorTrail() {
  const coords = useRef({ x: 0, y: 0 })
  const circlesRef = useRef<Circle[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      coords.current.x = e.clientX
      coords.current.y = e.clientY
    }

    const animate = () => {
      let x = coords.current.x
      let y = coords.current.y

      circlesRef.current.forEach((circle, index) => {
        circle.style.left = `${x - 8}px`
        circle.style.top = `${y - 8}px`
        circle.style.scale = `${(circlesRef.current.length - index) / circlesRef.current.length}`
        circle.style.opacity = `${1 - index * 0.05}`

        const nextCircle = circlesRef.current[index + 1] || circlesRef.current[0]
        circle.x = x
        circle.y = y

        x += (nextCircle.x - x) * 0.3
        y += (nextCircle.y - y) * 0.3
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animate()

    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      {colors.map((color, i) => (
        <div
          key={i}
          ref={el => {
            if (el) {
              const circle = el as Circle
              circle.x = 0
              circle.y = 0
              circlesRef.current[i] = circle
            }
          }}
          style={{
            position: "fixed",
            height: "16px",
            width: "16px",
            borderRadius: "9999px",
            backgroundColor: color,
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 999999,
            mixBlendMode: "screen", // Para suavizar no fundo escuro
            opacity: 0.8,
            transition: "background-color 0.3s",
          }}
        />
      ))}
    </>
  )
}
