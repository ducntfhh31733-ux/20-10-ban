
"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, RefreshCw } from "lucide-react";
import { SWEET_COMPLIMENTS } from "@/utils/data";
import { playHeartPop } from "@/utils/audio";

interface ComplimentGeneratorProps {
  wifeName: string;
}

export default function ComplimentGenerator({
  wifeName,
}: ComplimentGeneratorProps) {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getNewCompliment = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isAnimating || SWEET_COMPLIMENTS.length === 0) return;

    setIsAnimating(true);
    playHeartPop();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x, y },
      colors: ["#ff758c", "#ff7eb3", "#ffd700"],
    });

    let nextIdx = index;

    if (SWEET_COMPLIMENTS.length > 1) {
      while (nextIdx === index) {
        nextIdx = Math.floor(
          Math.random() * SWEET_COMPLIMENTS.length
        );
      }
    }

    setTimeout(() => {
      setIndex(nextIdx);
      setIsAnimating(false);
    }, 250);
  };

  const compliment =
    SWEET_COMPLIMENTS.length > 0
      ? SWEET_COMPLIMENTS[index].replace(
          /Thiên/gi,
          wifeName || "Thiên"
        )
      : `${wifeName || "Thiên"} là một bạn nữ thật tuyệt vời! 💖`;

  return (
    <section className="compliment-section">
      <div className="section-header">
        <span className="section-tag">
          <Sparkles size={16} />
          Hũ Lời Khen Dành Cho Thiên
        </span>

        <h2 className="section-title">
          Những Điều Tuyệt Vời Về Thiên 💖
        </h2>

        <p className="section-desc">
          Mỗi lần chạm là một lời khen dễ thương dành riêng cho Thiên!
        </p>
      </div>

      <div className="compliment-card">
        <div className="candy-icon-wrap">
          <span className="candy-emoji">🍬</span>
        </div>

        <div
          className={`compliment-display ${
            isAnimating
              ? "animate-fade-out"
              : "animate-fade-in"
          }`}
        >
          <p className="compliment-quote">
            “{compliment}”
          </p>
        </div>

        <div className="compliment-footer">
          <button
            id="btn-get-compliment"
            onClick={getNewCompliment}
            disabled={
              isAnimating || SWEET_COMPLIMENTS.length === 0
            }
            className="btn-draw-candy"
          >
            <RefreshCw
              size={18}
              className={isAnimating ? "animate-spin" : ""}
            />
            <span>Lời Khen Tiếp Theo</span>
            <Heart size={16} fill="currentColor" />
          </button>
        </div>
      </div>
    </section>
  );
}
