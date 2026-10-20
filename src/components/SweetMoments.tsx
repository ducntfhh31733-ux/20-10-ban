
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Camera, Sparkles, Plus, Trash2 } from "lucide-react";
import { playHeartPop } from "@/utils/audio";

interface SweetPhoto {
  id: string;
  url: string;
  caption: string;
  date: string;
  rotation: number;
}

const DEFAULT_PHOTOS: SweetPhoto[] = [
  {
    id: "default-1",
    url: "/images/bouquet.jpg?v=2",
    caption: "Bó hoa xinh xắn gửi tặng cô bạn Thiên nhân ngày 20/10 💐",
    date: "20/10/2026",
    rotation: -3,
  },
  {
    id: "default-2",
    url: "/images/couple.jpg?v=2",
    caption: "Mong tình bạn của chúng ta luôn có thật nhiều niềm vui và kỷ niệm đẹp 🌷",
    date: "Những ngày đáng nhớ",
    rotation: 2,
  },
  {
    id: "default-3",
    url: "/images/cake.jpg?v=2",
    caption: "Một chút ngọt ngào dành cho cô gái tên Thiên 🍰",
    date: "Niềm vui nho nhỏ",
    rotation: -2,
  },
];

export default function SweetMoments() {
  const [photos, setPhotos] = useState<SweetPhoto[]>(DEFAULT_PHOTOS);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("friend_moments_photos");

      if (saved) {
        const parsed: SweetPhoto[] = JSON.parse(saved);
        const customOnly = parsed.filter((p) =>
          p.id.startsWith("custom-")
        );

        if (customOnly.length > 0) {
          setPhotos([...DEFAULT_PHOTOS, ...customOnly]);
          return;
        }
      }

      setPhotos(DEFAULT_PHOTOS);
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleUploadPhoto = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    playHeartPop();

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        const newPhoto: SweetPhoto = {
          id: "custom-" + Date.now(),
          url: event.target.result,
          caption: "Một kỷ niệm thật đẹp cùng cô bạn Thiên 💖",
          date: new Date().toLocaleDateString("vi-VN"),
          rotation: (Math.random() - 0.5) * 6,
        };

        setPhotos((prev) => {
          const updated = [...prev, newPhoto];

          try {
            localStorage.setItem(
              "friend_moments_photos",
              JSON.stringify(updated)
            );
          } catch (err) {
            console.warn(
              "Không thể lưu ảnh. Có thể dung lượng lưu trữ đã đầy.",
              err
            );
          }

          return updated;
        });
      }

      // Cho phép chọn lại cùng một ảnh
      e.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    setPhotos((prev) => {
      const updated = prev.filter((p) => p.id !== id);

      try {
        localStorage.setItem(
          "friend_moments_photos",
          JSON.stringify(updated)
        );
      } catch (err) {
        console.error(err);
      }

      return updated;
    });
  };

  return (
    <section className="moments-section">
      <div className="section-header">
        <span className="section-tag">
          <Camera size={16} />
          Album Kỷ Niệm Của Thiên 📸
        </span>

        <h2 className="section-title">
          Những Khoảnh Khắc Đáng Nhớ 💗
        </h2>

        <p className="section-desc">
          Lưu giữ những niềm vui nho nhỏ, những nụ cười đáng yêu
          và những kỷ niệm đẹp dành tặng cô bạn Thiên.
        </p>
      </div>

      <div className="polaroid-gallery">
        {photos.map((item) => (
          <div
            key={item.id}
            className="polaroid-card"
            style={{
              transform: `rotate(${item.rotation}deg)`,
            }}
          >
            <div className="washi-tape" />

            <div className="polaroid-img-wrapper">
              <Image
                src={item.url}
                alt={item.caption}
                width={500}
                height={500}
                className="polaroid-img"
                unoptimized={true}
              />
            </div>

            <div className="polaroid-info">
              <p className="polaroid-caption">
                {item.caption}
              </p>

              <div className="polaroid-meta">
                <span className="polaroid-date">
                  <Sparkles
                    size={12}
                    className="inline mr-1 text-amber-400"
                  />
                  {item.date}
                </span>

                {item.id.startsWith("custom-") && (
                  <button
                    onClick={(e) =>
                      handleDeletePhoto(item.id, e)
                    }
                    className="btn-delete-photo"
                    title="Xóa ảnh"
                    type="button"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nút thêm ảnh kỷ niệm */}
      <div className="moments-actions">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          style={{ display: "none" }}
          onChange={handleUploadPhoto}
        />

        <button
          id="btn-upload-moment"
          onClick={() => fileInputRef.current?.click()}
          className="btn-add-moment"
          type="button"
        >
          <Plus size={18} />
          <span>Thêm Ảnh Kỷ Niệm</span>
        </button>

        <p className="moments-note">
          💡 Bạn có thể tải lên những bức ảnh yêu thích để làm
          album dành riêng cho Thiên thêm đặc biệt nhé!
        </p>
      </div>
    </section>
  );
}
