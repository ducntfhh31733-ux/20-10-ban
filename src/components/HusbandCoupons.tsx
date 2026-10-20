"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Utensils,
  ShoppingBag,
  Award,
  Heart,
  Flame,
  CheckCircle,
  Gift,
} from "lucide-react";
import { INITIAL_COUPONS } from "@/utils/data";
import { CouponItem } from "@/types";
import { playChime } from "@/utils/audio";

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="coupon-icon-svg" />,
  Utensils: <Utensils className="coupon-icon-svg" />,
  ShoppingBag: <ShoppingBag className="coupon-icon-svg" />,
  Award: <Award className="coupon-icon-svg" />,
  Heart: <Heart className="coupon-icon-svg" />,
  Flame: <Flame className="coupon-icon-svg" />,
};

interface HusbandCouponsProps {
  wifeName: string;
}

export default function HusbandCoupons({
  wifeName,
}: HusbandCouponsProps) {
  const [coupons, setCoupons] = useState<CouponItem[]>(INITIAL_COUPONS);

  const friendName = wifeName || "Thiên";

  useEffect(() => {
    try {
      const saved = localStorage.getItem("friend_coupons_2010");

      if (saved) {
        setCoupons(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Không thể tải lời chúc đã lưu:", e);
    }
  }, []);

  const handleRedeem = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    playChime();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { x, y },
      colors: [
        "#ff8fab",
        "#ffc2d1",
        "#ffd6a5",
        "#d8c8ff",
        "#ffffff",
      ],
    });

    setCoupons((prev) => {
      const updated = prev.map((coupon) =>
        coupon.id === id
          ? { ...coupon, redeemed: !coupon.redeemed }
          : coupon
      );

      try {
        localStorage.setItem(
          "friend_coupons_2010",
          JSON.stringify(updated)
        );
      } catch (err) {
        console.error("Không thể lưu trạng thái lời chúc:", err);
      }

      return updated;
    });
  };

  const redeemedCount = coupons.filter(
    (coupon) => coupon.redeemed
  ).length;

  return (
    <section id="coupons-section" className="coupons-section">
      <div className="section-header">
        <span className="section-tag">
          <Gift size={16} />
          Bạn Thiên Gửi Tặng Bạn 🌷
        </span>

        <h2 className="section-title">
          Thiên Ơi, Những Lời Chúc Này Dành Cho Bạn! 🎁
        </h2>

        <p className="section-desc">
          Nhân ngày 20/10, bạn của Thiên đã chuẩn bị những lời
          chúc nhỏ xinh dành riêng cho bạn. 💗
          Chúc Thiên luôn xinh đẹp, có thật nhiều niềm vui,
          luôn hạnh phúc và gặp nhiều may mắn.
          Mong Thiên luôn tự tin, gặp nhiều điều tốt đẹp
          và đừng quên người bạn đã gửi tặng bạn món quà này nhé! 🌸
        </p>

        <div className="coupons-progress-pill">
          <span>
            Đã khám phá: {redeemedCount}/{coupons.length} lời chúc
          </span>
        </div>
      </div>

      <div className="coupons-grid">
        {coupons.map((coupon) => {
          const isRedeemed = coupon.redeemed;

          return (
            <div
              key={coupon.id}
              className={`coupon-card ${
                isRedeemed ? "redeemed" : ""
              }`}
            >
              <div className="coupon-edge-decor left" />
              <div className="coupon-edge-decor right" />

              <div className="coupon-header">
                <div className="coupon-badge">
                  {coupon.badge}
                </div>

                <div className="coupon-icon">
                  {iconMap[coupon.iconName] || (
                    <Heart className="coupon-icon-svg" />
                  )}
                </div>
              </div>

              <div className="coupon-content">
                <h4 className="coupon-title">
                  {coupon.title}
                </h4>

                <p className="coupon-desc">
                  {coupon.desc}
                </p>
              </div>

              <div className="coupon-footer">
                <button
                  id={`btn-redeem-${coupon.id}`}
                  onClick={(e) => handleRedeem(coupon.id, e)}
                  className={`btn-redeem ${
                    isRedeemed ? "btn-redeemed" : ""
                  }`}
                >
                  {isRedeemed ? (
                    <>
                      <CheckCircle size={16} />
                      ĐÃ ĐỌC LỜI CHÚC (Hoàn tác)
                    </>
                  ) : (
                    <>
                      <Gift size={16} />
                      Đọc Lời Chúc
                    </>
                  )}
                </button>
              </div>

              {isRedeemed && (
                <div className="coupon-stamp-overlay">
                  <div className="coupon-stamp">
                    <span>ĐÃ ĐỌC LỜI CHÚC</span>
                    <small>
                      GỬI TẶNG {friendName.toUpperCase()} 🌷
                    </small>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}