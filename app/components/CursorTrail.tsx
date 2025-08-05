"use client"

import { useEffect } from "react"

export default function CursorTrail() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const trail = document.createElement("div")
      trail.className = "asteroid-trail"
      trail.style.left = e.pageX + "px"
      trail.style.top = e.pageY + "px"
      document.body.appendChild(trail)

      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail)
        }
      }, 500)
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return null
}
