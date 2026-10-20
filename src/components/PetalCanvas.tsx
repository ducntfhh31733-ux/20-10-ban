
"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  type: "petal" | "heart" | "sparkle";
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Bảng màu pastel dành cho món quà của Thiên
    const petalColors = [
      "rgba(255, 182, 193, 0.7)",
      "rgba(255, 209, 220, 0.7)",
      "rgba(255, 228, 225, 0.75)",
      "rgba(221, 160, 221, 0.65)",
      "rgba(255, 240, 200, 0.75)",
      "rgba(255, 153, 204, 0.6)",
    ];

    const count = Math.min(width < 768 ? 24 : 45, 50);
    const petals: Petal[] = [];

    for (let i = 0; i < count; i++) {
      const isHeart = Math.random() < 0.25;
      const isSparkle = !isHeart && Math.random() < 0.2;

      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isHeart
          ? Math.random() * 8 + 6
          : Math.random() * 12 + 8,
        speedX: Math.random() * 1.2 - 0.6,
        speedY: Math.random() * 1.2 + 0.6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.4 + 0.3,
        color:
          petalColors[
            Math.floor(Math.random() * petalColors.length)
          ],
        type: isHeart
          ? "heart"
          : isSparkle
            ? "sparkle"
            : "petal",
      });
    }

    const drawHeart = (
      x: number,
      y: number,
      size: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.translate(x, y);
      ctx.beginPath();

      const topCurveHeight = size * 0.3;

      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(
        0,
        0,
        -size / 2,
        0,
        -size / 2,
        topCurveHeight
      );
      ctx.bezierCurveTo(
        -size / 2,
        (size + topCurveHeight) / 2,
        0,
        (size + topCurveHeight) / 2,
        0,
        size
      );
      ctx.bezierCurveTo(
        0,
        (size + topCurveHeight) / 2,
        size / 2,
        (size + topCurveHeight) / 2,
        size / 2,
        topCurveHeight
      );
      ctx.bezierCurveTo(
        size / 2,
        0,
        0,
        0,
        0,
        topCurveHeight
      );

      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawPetal = (
      x: number,
      y: number,
      size: number,
      rot: number,
      color: string,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = color;
      ctx.translate(x, y);
      ctx.rotate((rot * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        size,
        size * 0.55,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (
      x: number,
      y: number,
      size: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "rgba(255, 248, 220, 0.95)";
      ctx.shadowColor = "rgba(255, 215, 150, 0.8)";
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + i) * 0.5;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === "heart") {
          drawHeart(p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === "sparkle") {
          drawSparkle(p.x, p.y, p.size, p.opacity);
        } else {
          drawPetal(
            p.x,
            p.y,
            p.size,
            p.rotation,
            p.color,
            p.opacity
          );
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
}
