"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Sparkles, Feather } from "lucide-react";
import { playHeartPop } from "@/utils/audio";

interface LoveLetterProps {
  wifeName: string;
  husbandName: string;
  letterTitle: string;
  letterMessage: string;
}

export default function LoveLetter({
  wifeName,
  husbandName,
  letterTitle,
  letterMessage,
}: LoveLetterProps) {
  const [loveCount, setLoveCount] = useState(0);

  const friendName = wifeName || "Thiên";
  const senderName = husbandName || "Bạn của Thiên";

  const handleSendLove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    playHeartPop();
    setLoveCount((prev) => prev + 1);

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 50,
      origin: { x, y },
      colors: ["#ff8fab", "#ffc2d1", "#ffd6a5", "#ffffff"],
    });
  };

  return (
    <section
      id="love-letter-section"
      className="letter-section"
    >
      <div className="section-header">
        <span className="section-tag">
          <Feather size={16} />
          Bức Thư Nhỏ Dành Tặng {friendName} 💌
        </span>

        <h2 className="section-title">
          Những Lời Chúc Dịu Dàng 🌷
        </h2>

        <p className="section-desc">
          Một bức thư nhỏ chứa đựng những lời chúc chân thành
          dành cho Thiên — người con gái đẹp và đầy dịu dàng.
        </p>
      </div>

      <div className="parchment-letter">
        <div className="parchment-corner top-left" />
        <div className="parchment-corner top-right" />
        <div className="parchment-corner bottom-left" />
        <div className="parchment-corner bottom-right" />

        <div className="letter-header">
          <span className="letter-date">
            Ngày 20 tháng 10 năm 2026
          </span>

          <h3 className="letter-heading">
            {letterTitle || `Gửi Thiên — Cô Bạn Dịu Dàng 💗`}
          </h3>

          <p className="letter-salutation">
            Gửi Thiên, cô bạn đáng mến của tớ! 🌷
          </p>
        </div>

        <div className="letter-body">
          {(
            letterMessage ||
            `Thiên à, nhân ngày Phụ nữ Việt Nam 20/10, tớ muốn gửi đến cậu những lời chúc tốt đẹp nhất! 💐\n\nChúc cậu luôn vui vẻ, tự tin, gặp nhiều may mắn và có thật nhiều niềm vui trong cuộc sống. Mong rằng mỗi ngày trôi qua, cậu đều tìm thấy những điều nhỏ bé khiến mình mỉm cười và luôn có những người bạn chân thành bên cạnh.\n\nCậu là một cô gái xinh đẹp và đầy dịu dàng. Mong cậu sẽ luôn giữ được sự đáng yêu của riêng mình, mạnh dạn theo đuổi những điều mình yêu thích và đón nhận thật nhiều điều tốt đẹp phía trước.\n\nCảm ơn cậu vì đã là một người bạn đặc biệt. Chúc Thiên có một ngày 20/10 thật vui vẻ, nhận được nhiều lời chúc dễ thương và luôn rạng rỡ với nụ cười của mình nhé! 🌸`
          )
            .split("\n\n")
            .map((para, idx) => (
              <p key={idx} className="letter-para">
                {para}
              </p>
            ))}
        </div>

        <div className="letter-signature-wrap">
          <p className="sig-sub">
            Chúc cậu một ngày 20/10 thật vui nhé,
          </p>

          <p className="sig-name">
            {senderName} 💗
          </p>

          <div className="sig-seal">
            <Heart
              size={20}
              fill="#e11d48"
              color="#e11d48"
            />
          </div>
        </div>

        <div className="letter-interactive-bar">
          <button
            id="btn-like-letter"
            onClick={handleSendLove}
            className="btn-letter-love"
          >
            <Heart
              size={20}
              className="fill-current text-rose-500 animate-bounce"
            />
            <span>Gửi lời chúc đến Thiên ({loveCount})</span>
          </button>

          {loveCount > 0 && (
            <span className="love-feedback-text">
              <Sparkles size={14} />
              Đã gửi {loveCount} lời chúc dễ thương đến{" "}
              {friendName} rồi nhé! 🌸
            </span>
          )}
        </div>
      </div>
    </section>
  );
}