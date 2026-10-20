
"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import {
  Send,
  Heart,
  Sparkles,
  Check,
  Copy,
  MessageSquare,
} from "lucide-react";
import { playChime, playHeartPop } from "@/utils/audio";

interface WishBoxProps {
  wifeName: string;
  husbandName: string;
}

export default function WishBox({
  wifeName,
  husbandName,
}: WishBoxProps) {
  const friendName = wifeName || "Thiên";
  const senderName = husbandName || "Bạn của Thiên";

  const [wish, setWish] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!wish.trim()) return;

    playChime();

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ff4d79", "#ffd700", "#ffffff", "#dda0dd"],
    });

    setSubmitted(true);
  };

  const shareText = `Gửi ${senderName}, điều ước 20/10 của ${friendName} là: "${wish}". Mong điều ước này sẽ trở thành hiện thực nhé! 💖`;

  const handleCopy = async () => {
    playHeartPop();

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Không thể sao chép lời nhắn:", error);
    }
  };

  const handleSendSMS = () => {
    window.location.href = `sms:?body=${encodeURIComponent(shareText)}`;
  };

  return (
    <section className="wishbox-section">
      <div className="section-header">
        <span className="section-tag">
          <Sparkles size={16} />
          Hộp Điều Ước Dành Cho Thiên 🎁
        </span>

        <h2 className="section-title">
          Ngày 20/10, {friendName} Mong Ước Điều Gì? 💗
        </h2>

        <p className="section-desc">
          Hãy viết ra một điều ước thật dễ thương nhé! Chúc
          Thiên luôn vui vẻ, gặp nhiều may mắn và có thật nhiều
          kỷ niệm đẹp bên những người bạn thân yêu. 🌷
        </p>
      </div>

      <div className="wishbox-card">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="wish-form">
            <div className="wish-input-wrapper">
              <textarea
                id="wife-wish-input"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="Ví dụ: Mong được đi ăn món mình thích, có một món quà bất ngờ hoặc có thêm thật nhiều kỷ niệm vui với bạn bè... 🎀"
                rows={3}
                className="wish-textarea"
                required
              />
            </div>

            <button
              id="btn-submit-wish"
              type="submit"
              className="btn-submit-wish"
              disabled={!wish.trim()}
            >
              <Send size={18} />
              <span>Gửi Điều Ước</span>
              <Heart size={16} fill="currentColor" />
            </button>
          </form>
        ) : (
          <div className="wish-success-box">
            <div className="success-icon-wrap">
              <Heart
                size={36}
                fill="#ff4d79"
                color="#ff4d79"
                className="animate-bounce"
              />
            </div>

            <h3 className="success-title">
              Điều Ước Của {friendName} Đã Được Ghi Nhận! 💖
            </h3>

            <p className="success-quote">“{wish}”</p>

            <p className="success-desc">
              Điều ước đã được ghi lại rồi nè! Hãy chia sẻ lời
              nhắn với bạn bè để cùng nhau biến những mong muốn
              nhỏ bé thành những kỷ niệm thật đáng nhớ nhé. ✨
            </p>

            <div className="wish-share-buttons">
              <button
                id="btn-sms-wish"
                onClick={handleSendSMS}
                className="btn-share-sms"
                type="button"
              >
                <MessageSquare size={16} />
                Gửi Tin Nhắn / SMS
              </button>

              <button
                id="btn-copy-wish"
                onClick={handleCopy}
                className="btn-share-copy"
                type="button"
              >
                {copied ? (
                  <Check size={16} />
                ) : (
                  <Copy size={16} />
                )}

                <span>
                  {copied ? "Đã Sao Chép!" : "Sao Chép Lời Nhắn"}
                </span>
              </button>

              <button
                id="btn-another-wish"
                onClick={() => {
                  setSubmitted(false);
                  setWish("");
                }}
                className="btn-another-wish"
                type="button"
              >
                Viết Điều Ước Khác ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
