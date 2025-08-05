"use client"

import { useEffect, useRef } from "react"

declare global {
  interface Window {
    MediaPipeHands: any
    drawingUtils: any
  }
}

export default function GestureController() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handsRef = useRef<any>(null)

  useEffect(() => {
    const loadMediaPipe = async () => {
      // Load MediaPipe scripts
      const script1 = document.createElement("script")
      script1.src = "https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js"
      document.head.appendChild(script1)

      const script2 = document.createElement("script")
      script2.src = "https://cdn.jsdelivr.net/npm/@mediapipe/control_utils/control_utils.js"
      document.head.appendChild(script2)

      const script3 = document.createElement("script")
      script3.src = "https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js"
      document.head.appendChild(script3)

      const script4 = document.createElement("script")
      script4.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js"
      document.head.appendChild(script4)

      // Wait for scripts to load
      await new Promise((resolve) => {
        script4.onload = resolve
      })

      initializeHands()
    }

    const initializeHands = () => {
      if (!window.MediaPipeHands) return

      const hands = new window.MediaPipeHands.Hands({
        locateFile: (file: string) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        },
      })

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      })

      hands.onResults(onResults)
      handsRef.current = hands

      // Initialize camera
      if (videoRef.current) {
        const camera = new window.MediaPipeHands.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current) {
              await hands.send({ image: videoRef.current })
            }
          },
          width: 640,
          height: 480,
        })
        camera.start()
      }
    }

    const onResults = (results: any) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        for (let i = 0; i < results.multiHandLandmarks.length; i++) {
          const landmarks = results.multiHandLandmarks[i]
          const handedness = results.multiHandedness[i].label

          processGestures(landmarks, handedness)
        }
      }
    }

    const processGestures = (landmarks: any[], handedness: string) => {
      // Get key points
      const thumb_tip = landmarks[4]
      const thumb_ip = landmarks[3]
      const index_tip = landmarks[8]
      const index_pip = landmarks[6]
      const middle_tip = landmarks[12]
      const middle_pip = landmarks[10]
      const ring_tip = landmarks[16]
      const pinky_tip = landmarks[20]
      const wrist = landmarks[0]

      // Calculate distances
      const thumbIndexDistance = calculateDistance(thumb_tip, index_tip)
      const thumbMiddleDistance = calculateDistance(thumb_tip, middle_tip)
      const indexMiddleDistance = calculateDistance(index_tip, middle_tip)

      // Gesture Recognition

      // 1. Pinch Scroll (Right Hand) - Thumb + Index
      if (handedness === "Right" && thumbIndexDistance < 0.05) {
        const scrollDirection = landmarks[8].y - landmarks[4].y
        window.scrollBy(0, scrollDirection * 500)
        showGestureIndicator("scroll", "Scroll Ativo")
      }

      // 2. Middle Finger Pinch Click - Thumb + Middle
      if (thumbMiddleDistance < 0.05) {
        simulateClick(middle_tip)
        showGestureIndicator("click", "Click Detectado")
      }

      // 3. Peace Sign Navigation - Index + Middle extended
      if (
        isFingerExtended(landmarks, 8) &&
        isFingerExtended(landmarks, 12) &&
        !isFingerExtended(landmarks, 16) &&
        !isFingerExtended(landmarks, 20)
      ) {
        const direction = index_tip.x > 0.5 ? "right" : "left"
        navigateSection(direction)
        showGestureIndicator("navigate", `Navegando ${direction}`)
      }

      // 4. Fist - Close all fingers (Reset/Home)
      if (
        !isFingerExtended(landmarks, 8) &&
        !isFingerExtended(landmarks, 12) &&
        !isFingerExtended(landmarks, 16) &&
        !isFingerExtended(landmarks, 20)
      ) {
        scrollToTop()
        showGestureIndicator("home", "Voltando ao Topo")
      }

      // 5. Open Palm - All fingers extended (Menu)
      if (
        isFingerExtended(landmarks, 8) &&
        isFingerExtended(landmarks, 12) &&
        isFingerExtended(landmarks, 16) &&
        isFingerExtended(landmarks, 20)
      ) {
        toggleMenu()
        showGestureIndicator("menu", "Menu Toggle")
      }

      // 6. Pointing - Only index extended (Hover effect)
      if (
        isFingerExtended(landmarks, 8) &&
        !isFingerExtended(landmarks, 12) &&
        !isFingerExtended(landmarks, 16) &&
        !isFingerExtended(landmarks, 20)
      ) {
        createHoverEffect(index_tip)
      }

      // 7. Zoom Gesture - Thumb + Pinky
      const thumbPinkyDistance = calculateDistance(thumb_tip, pinky_tip)
      if (thumbPinkyDistance > 0.15) {
        zoomIn()
        showGestureIndicator("zoom", "Zoom In")
      } else if (thumbPinkyDistance < 0.08) {
        zoomOut()
        showGestureIndicator("zoom", "Zoom Out")
      }
    }

    const calculateDistance = (point1: any, point2: any) => {
      return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2))
    }

    const isFingerExtended = (landmarks: any[], tipIndex: number) => {
      const tip = landmarks[tipIndex]
      const pip = landmarks[tipIndex - 2]
      return tip.y < pip.y
    }

    const simulateClick = (position: any) => {
      const x = position.x * window.innerWidth
      const y = position.y * window.innerHeight
      const element = document.elementFromPoint(x, y)
      if (element && element.click) {
        element.click()
      }
    }

    const navigateSection = (direction: string) => {
      const sections = document.querySelectorAll("section")
      const currentSection = getCurrentSection()
      const currentIndex = Array.from(sections).indexOf(currentSection)

      if (direction === "right" && currentIndex < sections.length - 1) {
        sections[currentIndex + 1].scrollIntoView({ behavior: "smooth" })
      } else if (direction === "left" && currentIndex > 0) {
        sections[currentIndex - 1].scrollIntoView({ behavior: "smooth" })
      }
    }

    const getCurrentSection = () => {
      const sections = document.querySelectorAll("section")
      const scrollY = window.scrollY

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 100) {
          return section
        }
      }
      return sections[0]
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }

    const toggleMenu = () => {
      const menuButton = document.querySelector("[data-menu-toggle]")
      if (menuButton) {
        ;(menuButton as HTMLElement).click()
      }
    }

    const createHoverEffect = (position: any) => {
      const x = position.x * window.innerWidth
      const y = position.y * window.innerHeight

      // Create hover indicator
      const indicator = document.createElement("div")
      indicator.className = "gesture-hover-indicator"
      indicator.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #2A7DE1, #7F00FF);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: pulse 0.5s ease-out;
      `

      document.body.appendChild(indicator)
      setTimeout(() => indicator.remove(), 500)
    }

    const zoomIn = () => {
      document.body.style.transform = "scale(1.1)"
      document.body.style.transformOrigin = "center"
    }

    const zoomOut = () => {
      document.body.style.transform = "scale(1)"
    }

    const showGestureIndicator = (type: string, message: string) => {
      // Remove existing indicator
      const existing = document.querySelector(".gesture-indicator")
      if (existing) existing.remove()

      // Create new indicator
      const indicator = document.createElement("div")
      indicator.className = "gesture-indicator"
      indicator.innerHTML = `
        <div class="gesture-icon">${getGestureIcon(type)}</div>
        <div class="gesture-message">${message}</div>
      `
      indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(10, 15, 30, 0.9);
        border: 1px solid #2A7DE1;
        border-radius: 10px;
        padding: 10px 15px;
        color: white;
        font-size: 14px;
        z-index: 9998;
        animation: slideIn 0.3s ease-out;
      `

      document.body.appendChild(indicator)
      setTimeout(() => indicator.remove(), 2000)
    }

    const getGestureIcon = (type: string) => {
      const icons = {
        scroll: "📜",
        click: "👆",
        navigate: "👉",
        home: "✊",
        menu: "✋",
        zoom: "🔍",
      }
      return icons[type as keyof typeof icons] || "👋"
    }

    loadMediaPipe()

    return () => {
      if (handsRef.current) {
        handsRef.current.close()
      }
    }
  }, [])

  return (
    <div className="gesture-controller">
      <video ref={videoRef} className="hidden" autoPlay muted playsInline />
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
