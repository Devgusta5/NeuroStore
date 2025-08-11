"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// Tipagem para pontos de referência do MediaPipe e helper tipado
type Landmark = { x: number; y: number; z?: number };
const calculateAngle = (A: Landmark, B: Landmark, C: Landmark): number => {
  const AB: { x: number; y: number } = { x: B.x - A.x, y: B.y - A.y };
  const CB: { x: number; y: number } = { x: B.x - C.x, y: B.y - C.y };
  const dot = AB.x * CB.x + AB.y * CB.y;
  const magAB = Math.hypot(AB.x, AB.y);
  const magCB = Math.hypot(CB.x, CB.y);
  const denom = magAB * magCB || 1e-12;
  const cos = Math.min(1, Math.max(-1, dot / denom));
  return Math.acos(cos) * (180 / Math.PI);
};

export default function HandTracker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastGestureTimeRef = useRef<number>(0);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const easterEggRef = useRef<HTMLDivElement>(null);
  const themeGestureStartRef = useRef<number | null>(null);
  const themeGestureCheckRef = useRef<NodeJS.Timeout | null>(null);

  // Funções de controle Navegar entre páginas, Trocar Tema, Simular Clique, Iniciar/Parar Scroll e Mostrar Easter Egg

  //Navegar entre páginas
 const [currentPage, setCurrentPage] = useState('home'); // 'home', 'docs', 'plans', 'blog'

const openDocs = useCallback(() => {    
    const pageOrder = ['inicio', 'docs', 'plans', 'blog'];
    const currentIndex = pageOrder.indexOf(currentPage);
    const nextIndex = (currentIndex + 1) % pageOrder.length;
    const nextPage = pageOrder[nextIndex];
    
    setCurrentPage(nextPage);
    window.dispatchEvent(new CustomEvent('handtracker:navigate', { detail: { page: nextPage } }));
    console.log(`📂 Navegando para: ${nextPage}...`);
}, [currentPage]);

  // Trocar Tema
  // Alterna entre os temas "light" e "dark"
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark') || html.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    html.classList.toggle('dark', next === 'dark'); // Necessário para Tailwind dark:
    html.setAttribute('data-theme', next);          // Compatível com libs (ex.: daisyUI)
    try { localStorage.setItem('theme', next); } catch {}
    console.log(`🌗 Tema alterado para ${next}`);
  }, []);

  const simulateClick = useCallback((x: number, y: number) => {
    const element = document.elementFromPoint(x, y) as HTMLElement;
    if (element) {
      element.click();
      console.log(`🖱 Clique simulado em (${x}, ${y})`);
    }
  }, []);

  const startScroll = useCallback((direction: 'up' | 'down') => {
    if (scrollIntervalRef.current) return;
    
    const speed = 20;
    scrollIntervalRef.current = setInterval(() => {
      window.scrollBy({
        top: direction === 'up' ? -speed : speed,
        behavior: 'smooth'
      });
    }, 16);
  }, []);

  const stopScroll = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }, []);

  const showEasterEgg = useCallback(() => {
    if (!easterEggRef.current) {
      const egg = document.createElement('div');
      egg.innerHTML = '✌️';
      egg.style.position = 'fixed';
      egg.style.fontSize = '100px';
      egg.style.zIndex = '2000';
      egg.style.pointerEvents = 'none';
      egg.style.animation = 'spin 2s linear infinite, fadeOut 3s forwards';
      egg.style.top = '50%';
      egg.style.left = '50%';
      egg.style.transform = 'translate(-50%, -50%)';
      
      document.body.appendChild(egg);
      easterEggRef.current = egg;
      
      // Adiciona estilos de animação
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes fadeOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(2); }
        }
      `;
      document.head.appendChild(style);
      
      setTimeout(() => {
        if (easterEggRef.current) {
          easterEggRef.current.remove();
          easterEggRef.current = null;
          style.remove();
        }
      }, 3000);
    }
  }, []);

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

    const distance = (a: Landmark, b: Landmark) =>
      Math.hypot(a.x - b.x, a.y - b.y);

    const detectGesture = (landmarks: Landmark[]) => {
      const now = Date.now();
      if (now - lastGestureTimeRef.current < 200) return; // Debounce de 200ms
      
      const thumbTip = landmarks[4];
      const indexTip = landmarks[8];
      const middleTip = landmarks[12];
      const ringTip = landmarks[16];
      const pinkyTip = landmarks[20];
      const wrist = landmarks[0];

      const thumbIndexDist = distance(thumbTip, indexTip);
      const thumbMiddleDist = distance(thumbTip, middleTip);
      const indexMiddleDist = distance(indexTip, middleTip);
      const middleRingDist = distance(middleTip, ringTip);
      const ringPinkyDist = distance(ringTip, pinkyTip);

      // Mapeia as coordenadas normalizadas para pixels na tela
      const handCenterX = (1 - wrist.x) * window.innerWidth; // Invertido por causa do espelhamento
      const handCenterY = wrist.y * window.innerHeight;

      // Click/Select
      if (thumbIndexDist < 0.05) {
        lastGestureTimeRef.current = now;
        simulateClick(handCenterX, handCenterY);
        return;
      }

      // Scroll Vertical
      if (thumbMiddleDist < 0.05) {
        lastGestureTimeRef.current = now;
        const direction = wrist.y < 0.5 ? 'down' : 'up';
        startScroll(direction);
        return;
      } else {
        stopScroll();
      }

      // Abrir menu
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

// Trocar tema ("L")
      // Detecção do gesto "L" para trocar tema
  const handScale = distance(wrist, indexTip); // escala base
const isThumbExtended = distance(thumbTip, wrist) / handScale > 1.0;
const isIndexExtended = distance(indexTip, wrist) / handScale > 1.0;
const isMiddleFolded = distance(middleTip, wrist) / handScale < 0.5;
const isRingFolded = distance(ringTip, wrist) / handScale < 0.5;
const isPinkyFolded = distance(pinkyTip, wrist) / handScale < 0.5;


if (isThumbExtended && isIndexExtended && 
    isMiddleFolded && isRingFolded && isPinkyFolded) {
  if (themeGestureStartRef.current === null) {
    themeGestureStartRef.current = now;
    console.log("🔄 Reconhecendo gesto 'L'... (segure por 2s)");
    
    themeGestureCheckRef.current = setTimeout(() => {
      if (Date.now() - (themeGestureStartRef.current || 0) >= 2000) {
        toggleTheme();
        console.log("✅ Tema alterado com sucesso!");
        themeGestureStartRef.current = null;
      }
    }, 2000);
  }
} else {
  if (themeGestureStartRef.current && Date.now() - themeGestureStartRef.current < 2000) {
    console.log("❌ Gesto 'L' interrompido antes do tempo");
    const progress = (Date.now() - themeGestureStartRef.current) / 2000;
  }
  if (themeGestureCheckRef.current) clearTimeout(themeGestureCheckRef.current);
  themeGestureStartRef.current = null;
}

// Easter egg ✌️
      const ringFolded = distance(ringTip, wrist) < 0.1;
      const pinkyFolded = distance(pinkyTip, wrist) < 0.1;
      if (!ringFolded && !pinkyFolded && indexMiddleDist < 0.1) {
        lastGestureTimeRef.current = now;
        showEasterEgg();
        return;
      }
    };

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
            w.drawConnectors(ctx, landmarks, w.HAND_CONNECTIONS, { color: "#7F00FF", lineWidth: 4 });
            w.drawLandmarks(ctx, landmarks, { color: "#00FFB0", lineWidth: 2 });
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
  }, [openDocs, toggleTheme, simulateClick, startScroll, stopScroll, showEasterEgg]);

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