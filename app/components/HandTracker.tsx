"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// Tipagem para pontos de referência
type Landmark = { x: number; y: number; z?: number };

export default function HandTracker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastGestureTimeRef = useRef<number>(0);

  // Scroll inercial
  const velocityRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number | null>(null);

  // Navegação entre páginas
  const [currentPage, setCurrentPage] = useState("home");
  const openDocs = useCallback(() => {
    const pageOrder = ["inicio", "docs", "plans", "blog"];
    const currentIndex = pageOrder.indexOf(currentPage);
    const nextIndex = (currentIndex + 1) % pageOrder.length;
    const nextPage = pageOrder[nextIndex];

    setCurrentPage(nextPage);
    window.dispatchEvent(
      new CustomEvent("handtracker:navigate", { detail: { page: nextPage } })
    );
    console.log(`Navegando para: ${nextPage}...`);
  }, [currentPage]);

  // Clique simulado
  const simulateClick = useCallback((x: number, y: number) => {
    const elAtPoint = document.elementFromPoint(x, y) as HTMLElement | null;
    if (!elAtPoint) return;

    const target =
      (elAtPoint.closest(
        "button, a, input, textarea, select, [role='button'], [onclick]"
      ) as HTMLElement) || elAtPoint;

    const clientX = x;
    const clientY = y;
    const base = {
      bubbles: true,
      cancelable: true,
      composed: true,
      clientX,
      clientY,
      screenX: window.screenX + clientX,
      screenY: window.screenY + clientY,
      button: 0,
      buttons: 1,
      view: window,
    } as const;

    try {
      target.dispatchEvent(
        new PointerEvent("pointerdown", {
          ...base,
          pointerId: 1,
          pointerType: "mouse",
        })
      );
    } catch {}
    target.dispatchEvent(new MouseEvent("mousedown", base as any));

    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      (target as HTMLElement).isContentEditable
    ) {
      (target as HTMLElement).focus();
    }

    try {
      target.dispatchEvent(
        new PointerEvent("pointerup", {
          ...base,
          pointerId: 1,
          pointerType: "mouse",
        })
      );
    } catch {}
    target.dispatchEvent(new MouseEvent("mouseup", base as any));
    target.dispatchEvent(new MouseEvent("click", { ...base, detail: 1 } as any));

    console.log("Click simulado em:", target.tagName, target);
  }, []);

  // Função auxiliar
  const distance = (a: Landmark, b: Landmark) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  // Scroll inercial
  const applyInertia = useCallback(() => {
    if (Math.abs(velocityRef.current) > 0.1) {
      window.scrollBy(0, velocityRef.current);
      velocityRef.current *= 0.95; // desaceleração
      animationRef.current = requestAnimationFrame(applyInertia);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
      velocityRef.current = 0;
    }
  }, []);

  const stopScroll = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    velocityRef.current = 0;
    lastScrollYRef.current = null;
  }, []);

  // Gestos
  const detectGesture = (landmarks: Landmark[]) => {
    const now = Date.now();
    if (now - lastGestureTimeRef.current < 200) return;

    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];

    const thumbIndexDist = distance(thumbTip, indexTip);
    const thumbMiddleDist = distance(thumbTip, middleTip);
    const indexMiddleDist = distance(indexTip, middleTip);
    const middleRingDist = distance(middleTip, ringTip);
    const ringPinkyDist = distance(ringTip, pinkyTip);

    // Mapeia para pixels
    const pinchX = (1 - (thumbTip.x + indexTip.x) / 2) * window.innerWidth;
    const pinchY = ((thumbTip.y + indexTip.y) / 2) * window.innerHeight;

    // 1) Clique → Pinça (polegar + indicador)
    if (thumbIndexDist < 0.05) {
      lastGestureTimeRef.current = now;
      simulateClick(pinchX, pinchY);
      return;
    }

    // 2) Scroll → Pinça (polegar + médio)
    const pinchScrollActive = thumbMiddleDist < 0.05;
    if (pinchScrollActive) {
      const pinchYNorm = (thumbTip.y + middleTip.y) / 2;
      const prevY = lastScrollYRef.current;
      lastScrollYRef.current = pinchYNorm;

      if (prevY != null) {
        const dy = pinchYNorm - prevY;
        const absDy = Math.abs(dy);
        const DEAD_ZONE = 0.01;

        if (absDy > DEAD_ZONE) {
          const speed = Math.min(
            50,
            Math.max(8, Math.round(dy * window.innerHeight * 0.2))
          );
          velocityRef.current = speed;
          if (!animationRef.current) applyInertia();
        }
      }
      lastGestureTimeRef.current = now;
      return;
    } else {
      stopScroll();
    }

    // 3) Navegação → Mão aberta (todos afastados)
    if (
      thumbIndexDist > 0.07 &&
      indexMiddleDist > 0.07 &&
      middleRingDist > 0.07 &&
      ringPinkyDist > 0.07
    ) {
      lastGestureTimeRef.current = now;
      openDocs();
      return;
    }
  };

  // Setup do MediaPipe
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
        const timeout = setTimeout(
          () => reject(new Error("MediaPipe timeout")),
          10000
        );
        const check = () => {
          const w = window as any;
          if (
            w.Hands &&
            w.Camera &&
            w.drawConnectors &&
            w.drawLandmarks &&
            w.HAND_CONNECTIONS
          ) {
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
        ctx.save();
        ctx.scale(-1, 1);
        ctx.translate(-canvas.width, 0);

        if (results.multiHandLandmarks) {
          results.multiHandLandmarks.forEach((landmarks: any) => {
            w.drawConnectors(ctx, landmarks, w.HAND_CONNECTIONS, {
              color: "#7F00FF",
              lineWidth: 4,
            });
            w.drawLandmarks(ctx, landmarks, {
              color: "#00FFB0",
              lineWidth: 2,
            });
            detectGesture(landmarks);
          });
        }

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
      stopScroll();
    };
  }, [openDocs, simulateClick, applyInertia, stopScroll]);

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
        style={{ display: "none" }}
        autoPlay
        muted
        playsInline
        width={640}
        height={480}
      />
    </div>
  );
}
