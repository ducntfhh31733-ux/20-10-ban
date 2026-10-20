"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Gift, Mail, Clock } from "lucide-react";
import { playHeartPop } from "@/utils/audio";

interface HeroSectionProps {
  wifeName: string;
  husbandName: string;
  startDate: string;
  onScrollToLetter: () => void;
  onScrollToCoupons: () => void;
}

export default function HeroSection({
  wifeName,
  startDate,
  onScrollToLetter,
  onScrollToCoupons,
}: HeroSectionProps) {
  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(startDate).getTime();

      if (Number.isNaN(start)) return;

      const now = new Date().getTime();
      const diff = Math.max(0, now - start);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeTogether({ days, hours, minutes, seconds });
    };

    calculateTime();

    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [startDate]);

  const handleBurstHearts = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    playHeartPop();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { x, y },
      colors: [
        "#ff8fab",
        "#ffc2d1",
        "#ffd6a5",
        "#d8c8ff",
        "#ffffff",
      ],
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-badge-wrap">
        <span className="hero-badge">
          <Sparkles
            size={16}
            className="text-rose-300 animate-spin-slow"
          />
          Một Món Quà Nhỏ Dành Tặng Thiên
          <Sparkles
            size={16}
            className="text-rose-300 animate-spin-slow"
          />
        </span>
      </div>

      <h1 className="hero-title">
        Gửi{" "}
        <span className="highlight-wife-name">
          {wifeName || "Thiên"}
        </span>
        , Người Con Gái Đẹp Và Đầy Dịu Dàng 🌷
      </h1>

      <p className="hero-subtitle">
        Thiên à, nhân ngày 20/10, chúc bạn luôn vui vẻ, tự tin
        và gặp thật nhiều điều tốt đẹp trong cuộc sống. Mong
        rằng mỗi ngày của bạn đều có những niềm vui nho nhỏ,
        những nụ cười thật tươi và thật nhiều điều đáng nhớ.
        Hy vọng món quà này sẽ khiến ngày đặc biệt của bạn
        thêm phần vui vẻ nhé! 💗
      </p>

      {/* Đồng hồ đếm thời gian */}
      <div className="love-clock-card">
        <div className="clock-header">
          <Clock size={18} className="text-rose-400" />
          <span>Thời Gian Kể Từ Ngày Đặc Biệt</span>
          <Heart
            size={16}
            className="text-rose-400"
            fill="currentColor"
          />
        </div>

        <div className="clock-grid">
          <div className="clock-box">
            <span className="clock-val">
              {timeTogether.days.toLocaleString("vi-VN")}
            </span>
            <span className="clock-unit">Ngày</span>
          </div>

          <span className="clock-divider">:</span>

          <div className="clock-box">
            <span className="clock-val">
              {String(timeTogether.hours).padStart(2, "0")}
            </span>
            <span className="clock-unit">Giờ</span>
          </div>

          <span className="clock-divider">:</span>

          <div className="clock-box">
            <span className="clock-val">
              {String(timeTogether.minutes).padStart(2, "0")}
            </span>
            <span className="clock-unit">Phút</span>
          </div>

          <span className="clock-divider">:</span>

          <div className="clock-box">
            <span className="clock-val accent-seconds">
              {String(timeTogether.seconds).padStart(2, "0")}
            </span>
            <span className="clock-unit">Giây</span>
          </div>
        </div>

        <p className="clock-sub">
          Chúc Thiên luôn có thật nhiều niềm vui, gặp được
          những điều tử tế và lưu giữ thật nhiều kỷ niệm đẹp.
          Mong nụ cười dịu dàng của bạn sẽ luôn rạng rỡ nhé! 🌸
        </p>
      </div>

      {/* Các nút chức năng */}
      <div className="hero-ctas">
        <button
          id="btn-scroll-letter"
          onClick={onScrollToLetter}
          className="btn-primary-hero"
        >
          <Mail size={18} />
          <span>Đọc Lời Nhắn Gửi Thiên</span>
        </button>

        <button
          id="btn-scroll-coupons"
          onClick={onScrollToCoupons}
          className="btn-secondary-hero"
        >
          <Gift size={18} />
          <span>Khám Phá Món Quà</span>
        </button>

        <button
          id="btn-burst-love"
          onClick={handleBurstHearts}
          className="btn-heart-burst"
          title="Gửi những lời chúc tốt đẹp đến Thiên!"
        >
          <Heart
            size={20}
            fill="#ff8fab"
            color="#ff8fab"
          />
          <span>Gửi Tim Và Lời Chúc</span>
        </button>
      </div>
    </section>
  );
}