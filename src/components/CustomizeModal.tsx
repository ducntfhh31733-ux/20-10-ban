"use client";

import { useState } from "react";
import {
  Settings,
  X,
  Save,
  Copy,
  Check,
  Heart,
  Sparkles,
  Link as LinkIcon,
} from "lucide-react";
import { CoupleConfig } from "@/types";
import { playHeartPop } from "@/utils/audio";

interface CustomizeModalProps {
  config: CoupleConfig;
  onSave: (newConfig: CoupleConfig) => void;
}

export default function CustomizeModal({
  config,
  onSave,
}: CustomizeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<CoupleConfig>(config);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleOpen = () => {
    playHeartPop();
    setFormData(config);
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playHeartPop();
    onSave(formData);
    setIsOpen(false);
  };

  const generateShareLink = () => {
    if (typeof window === "undefined") return "";

    const params = new URLSearchParams();

    if (formData.wifeName) {
      params.set("wife", formData.wifeName);
    }

    if (formData.husbandName) {
      params.set("husband", formData.husbandName);
    }

    if (formData.startDate) {
      params.set("date", formData.startDate);
    }

    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  const handleCopyLink = async () => {
    const link = generateShareLink();

    try {
      await navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      window.prompt("Bạn hãy sao chép đường link này:", link);
    }
  };

  return (
    <>
      <div className="customize-trigger-wrap">
        <button
          id="btn-open-customize"
          onClick={handleOpen}
          className="btn-customize-trigger"
          title="Tùy chỉnh món quà dành tặng Thiên"
          type="button"
        >
          <Settings size={18} className="animate-spin-slow" />
          <span>Tùy Chỉnh Món Quà</span>
        </button>
      </div>

      {isOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Heart
                  size={20}
                  className="text-rose-500 fill-current"
                />
                <h3 className="modal-title">
                  Món Quà Nhỏ Dành Tặng Thiên 🌷
                </h3>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="modal-close-btn"
                title="Đóng"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <p className="modal-intro">
              💌 Hãy tự tay tạo nên một món quà 20/10 thật dễ
              thương dành cho Thiên nhé! Bạn có thể chỉnh sửa
              thông tin người nhận, ngày tặng quà, lời chúc và
              nhạc nền. Khi hoàn tất, hãy sao chép đường link
              để gửi món quà đến cô gái xinh đẹp và dịu dàng ấy!
            </p>

            <form onSubmit={handleSave} className="modal-form">
              <div className="form-group-grid">
                <div className="form-field">
                  <label htmlFor="input-wife-name">
                    Tên người nhận quà:
                  </label>

                  <input
                    id="input-wife-name"
                    type="text"
                    value={formData.wifeName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        wifeName: e.target.value,
                      })
                    }
                    placeholder="Ví dụ: Thiên 🌸"
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="input-husband-name">
                    Tên người gửi:
                  </label>

                  <input
                    id="input-husband-name"
                    type="text"
                    value={formData.husbandName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        husbandName: e.target.value,
                      })
                    }
                    placeholder="Nhập tên của bạn"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="input-start-date">
                  Ngày gửi tặng món quà:
                </label>

                <input
                  id="input-start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      startDate: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="input-letter-title">
                  Tiêu đề lời chúc dành cho Thiên:
                </label>

                <input
                  id="input-letter-title"
                  type="text"
                  value={formData.letterTitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letterTitle: e.target.value,
                    })
                  }
                  placeholder="Ví dụ: Gửi cô gái dịu dàng tên Thiên 🌷"
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="input-letter-msg">
                  Lời chúc 20/10:
                </label>

                <textarea
                  id="input-letter-msg"
                  rows={4}
                  value={formData.letterMessage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      letterMessage: e.target.value,
                    })
                  }
                  placeholder="Viết những lời chúc chân thành và dễ thương dành tặng Thiên..."
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="input-song-url">
                  Nhạc nền cho món quà:
                </label>

                <input
                  id="input-song-url"
                  type="text"
                  value={formData.songUrl || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      songUrl: e.target.value,
                    })
                  }
                  placeholder="/music.mp3 hoặc link MP3 trực tiếp"
                />

                <span
                  style={{
                    fontSize: "0.75rem",
                    color: "#fda4af",
                    marginTop: "2px",
                  }}
                >
                  🎵 Gợi ý: Đặt file nhạc trong thư mục{" "}
                  <code>public/music.mp3</code>, rồi nhập{" "}
                  <code>/music.mp3</code> vào ô trên.
                </span>
              </div>

              <div className="share-link-box">
                <div className="share-link-info">
                  <LinkIcon
                    size={16}
                    className="text-amber-400"
                  />
                  <span>Đường link món quà dành tặng Thiên:</span>
                </div>

                <div className="share-link-input-row">
                  <input
                    type="text"
                    readOnly
                    value={generateShareLink()}
                    className="share-link-input"
                  />

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="btn-copy-share-link"
                  >
                    {copiedLink ? (
                      <Check size={16} />
                    ) : (
                      <Copy size={16} />
                    )}

                    <span>
                      {copiedLink ? "Đã sao chép" : "Sao chép link"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-modal-cancel"
                >
                  Đóng
                </button>

                <button
                  type="submit"
                  className="btn-modal-save"
                >
                  <Save size={16} />
                  <span>Lưu Món Quà</span>
                  <Sparkles size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}