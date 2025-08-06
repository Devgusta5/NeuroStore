"use client"

import { useEffect, useState } from "react"

interface TrailPoint {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let trailId = 0

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      const newPoint: TrailPoint = {
        x: e.clientX,
        y: e.clientY,
        id: trailId++
      }

      setTrail(prev => {
        const newTrail = [newPoint, ...prev.slice(0, 8)]
        return newTrail
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      {/* Custom Cursor */}
      <div 
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePos.x - 6,
          top: mousePos.y - 2,
          transition: 'all 0.1s ease-out'
        }}
      >
        <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path 
            d="M0 0L0 11.2L3.2 8L6.4 11.2L8 9.6L4.8 6.4L8 6.4L0 0Z" 
            fill="white"
            className="drop-shadow-sm"
          />
        </svg>
      </div>

      {/* Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            width: 4 - (index * 0.3),
            height: 4 - (index * 0.3),
            background: `linear-gradient(45deg, 
              rgba(168, 85, 247, ${0.6 - index * 0.07}), 
              rgba(59, 130, 246, ${0.4 - index * 0.05})
            )`,
            animation: `fadeOut 0.8s ease-out forwards`,
            animationDelay: `${index * 0.05}s`
          }}
        />
      ))}
    </>
  )
}
