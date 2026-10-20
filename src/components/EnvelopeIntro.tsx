"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { playChime, startRomanticMelody } from "@/utils/audio";
import { Heart, Sparkles } from "lucide-react";

interface EnvelopeIntroProps {
  wifeName: string;
  songUrl?: string;
  onOpen: () => void;
}

export default function EnvelopeIntro({
  wifeName,
  songUrl,
  onOpen,
}: EnvelopeIntroProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;

    setIsOpening(true);

    // Phát âm thanh khi mở phong thư
    playChime();
    startRomanticMelody(undefined, songUrl);

    // Hiệu ứng pháo giấy ở giữa màn hình
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#ff8fab", "#ffc2d1", "#ffd6a5", "#ffffff", "#d8c8ff"],
    });

    // Pháo giấy từ hai bên
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
        colors: ["#ff8fab", "#ffc2d1", "#ffd6a5", "#ffffff"],
      });

      confetti({
        particleCount: 100,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
        colors: ["#ff8fab", "#ffc2d1", "#ffd6a5", "#ffffff"],
      });
    }, 300);

    // Hiển thị nội dung món quà sau khi mở thư
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <div className={`envelope-overlay ${isOpening ? "opening" : ""}`}>
      <div className="envelope-wrapper">
        <div className="envelope-glow" />

        <div className="envelope-card-preview">
          <div
            className="envelope-box"
            onClick={handleOpenEnvelope}
          >
            <div className="envelope-flap" />
            <div className="envelope-pocket" />

            <div className="wax-seal">
              <Heart
                className="wax-heart-icon"
                fill="currentColor"
              />
              <span>20/10</span>
            </div>

            <div className="letter-peek">
              <Sparkles
                size={16}
                className="text-amber-300"
              />
              <span>Thư gửi {wifeName} 🌷</span>
            </div>
          </div>
        </div>

        <div className="envelope-instruction">
          <p className="instruction-badge">
            <Sparkles size={16} />
            Một Món Quà Nhỏ Dành Tặng {wifeName}
          </p>

          <h1 className="instruction-title">
            Gửi Cô Gái Dịu Dàng 💗
          </h1>

          <p className="instruction-sub">
            {wifeName} ơi, có một món quà nhỏ cùng những lời chúc
            chân thành đang chờ bạn khám phá. Mong rằng món quà
            này sẽ mang đến cho bạn thật nhiều niềm vui và nụ cười.
            Hãy mở phong thư để xem nhé! ✨
          </p>

          <button
            id="btn-open-envelope"
            onClick={handleOpenEnvelope}
            className="envelope-open-btn"
            disabled={isOpening}
          >
            <span>
              {isOpening ? "Đang Mở Quà..." : "Khám Phá Món Quà"}
            </span>

            <Heart
              size={20}
              className="pulse-heart"
              fill="currentColor"
            />
          </button>
        </div>
      </div>
    </div>
  );
}