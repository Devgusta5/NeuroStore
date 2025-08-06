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
      const thumb_tip = landmarks[4]
      const index_tip = landmarks[8]
      const middle_tip = landmarks[12]

      const thumbIndexDistance = calculateDistance(thumb_tip, index_tip)
      const thumbMiddleDistance = calculateDistance(thumb_tip, middle_tip)

      // Pinch Scroll (Right Hand)
      if (handedness === "Right" && thumbIndexDistance < 0.05) {
        const scrollDirection = landmarks[8].y - landmarks[4].y
        window.scrollBy(0, scrollDirection * 300)
      }

      // Middle Finger Pinch Click
      if (thumbMiddleDistance < 0.05) {
        simulateClick(middle_tip)
      }

      // Fist - scroll to top
      if (
        !isFingerExtended(landmarks, 8) &&
        !isFingerExtended(landmarks, 12) &&
        !isFingerExtended(landmarks, 16) &&
        !isFingerExtended(landmarks, 20)
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" })
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
    </div>
  )
}
