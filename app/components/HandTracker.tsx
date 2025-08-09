"use client";

import { useEffect, useRef } from "react";

export default function HandTracker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let mounted = true;
    let camera: any;
    let hands: any;

    const resizeCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const waitForMediaPipe = () =>
      new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error("MediaPipe timeout")), 10000);
        const check = () => {
          const w = window as any;
          if (w.Hands && w.Camera && w.drawConnectors && w.drawLandmarks && w.HAND_CONNECTIONS) {
            clearTimeout(timeout);
            resolve();
          } else {
            requestAnimationFrame(check);
          }
        };
        check();
      });

    const start = async () => {
      try {
        await waitForMediaPipe();
      } catch {
        console.warn("MediaPipe not ready.");
        return;
      }
      if (!mounted) return;

      const video = videoRef.current!;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const w = window as any;

      hands = new w.Hands({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1675469240/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.7,
      });

      hands.onResults((results: any) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Salva o estado atual do contexto
        ctx.save();
        
        // Espelha o canvas horizontalmente
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);
        
        if (results.multiHandLandmarks) {
          results.multiHandLandmarks.forEach((landmarks: any) => {
            w.drawConnectors(ctx, landmarks, w.HAND_CONNECTIONS, { color: "#7F00FF", lineWidth: 4 });
            w.drawLandmarks(ctx, landmarks, { color: "#00FFB0", lineWidth: 2 });
          });
        }
        
        // Restaura o estado do contexto
        ctx.restore();
      });

      camera = new w.Camera(video, {
        onFrame: async () => {
          await hands.send({ image: video });
        },
        width: 640,
        height: 480,
      });

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      camera.start();
    };

    start();

    return () => {
      mounted = false;
      try {
        camera?.stop?.();
      } catch {}
      try {
        hands?.close?.();
      } catch {}
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />
      <video 
        ref={videoRef} 
        style={{ display: 'none' }} 
        autoPlay 
        muted 
        playsInline 
        width={640} 
        height={480} 
      />
    </div>
  );
}