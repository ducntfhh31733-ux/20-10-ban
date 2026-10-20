
"use client";

import { useState, useEffect } from "react";
import { Gift, Volume2, VolumeX } from "lucide-react";
import {
  toggleRomanticMelody,
  getIsPlayingMelody,
  subscribeAudioState,
  playHeartPop,
} from "@/utils/audio";

interface AudioPlayerProps {
  songUrl?: string;
}

export default function AudioPlayer({ songUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(getIsPlayingMelody());

    const unsub = subscribeAudioState((playing) => {
      setIsPlaying(playing);
    });

    return unsub;
  }, []);

  const handleToggle = () => {
    playHeartPop();
    toggleRomanticMelody(undefined, songUrl);
  };

  return (
    <div className="audio-widget-container">
      <button
        id="btn-toggle-music"
        onClick={handleToggle}
        className={`audio-toggle-button gift-theme ${
          isPlaying ? "playing" : ""
        }`}
        title={
          isPlaying
            ? "Tắt nhạc tặng bạn"
            : "Bật nhạc tặng bạn"
        }
        aria-label="Bật hoặc tắt nhạc nền"
      >
        <div className="audio-disc-icon">
          <Gift
            size={18}
            className={isPlaying ? "spin-music" : ""}
          />
        </div>

        <span className="audio-label">
          {isPlaying ? (
            <>
              <Volume2 size={16} />
              Nhạc dành tặng bạn 🎁
            </>
          ) : (
            <>
              <VolumeX size={16} />
              Mở món quà âm nhạc
            </>
          )}
        </span>

        {isPlaying && (
          <div className="sound-waves">
            <span className="wave-bar bar-1" />
            <span className="wave-bar bar-2" />
            <span className="wave-bar bar-3" />
          </div>
        )}
      </button>
    </div>
  );
}
