import { useEffect, useRef, useState } from "react";
import gambusi from "../assets/gambusigorontalo.mp3";

// Mulai dari detik ke-5 dan loop terus dari titik itu (lewati intro)
const START_AT = 5;

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekToStart = () => {
      try {
        if (audio.currentTime < START_AT) audio.currentTime = START_AT;
      } catch {
        /* belum seekable, diabaikan */
      }
    };

    const events = ["pointerdown", "keydown", "touchstart", "scroll"];

    const startOnGesture = () => {
      seekToStart();
      audio.play().catch(() => {});
    };

    const tryPlay = () => {
      seekToStart();
      const p = audio.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          // Autoplay diblokir browser → mulai saat interaksi pertama
          events.forEach((e) =>
            window.addEventListener(e, startOnGesture, {
              once: true,
              passive: true,
            })
          );
        });
      }
    };

    const onLoaded = () => {
      seekToStart();
      tryPlay();
    };

    // Loop manual agar setiap putaran mulai lagi dari detik ke-5
    const onEnded = () => {
      audio.currentTime = START_AT;
      audio.play().catch(() => {});
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    if (audio.readyState >= 1) onLoaded();

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      events.forEach((e) => window.removeEventListener(e, startOnGesture));
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    if (!next && audio.paused) {
      if (audio.currentTime < START_AT) audio.currentTime = START_AT;
      audio.play().catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={gambusi} preload="auto" />
      <button
        onClick={toggleMute}
        aria-label={muted ? "Nyalakan musik" : "Matikan musik"}
        title={muted ? "Nyalakan musik" : "Matikan musik"}
        className="fixed bottom-5 left-5 z-[60] flex h-12 w-12 items-center justify-center rounded-full border border-main/40 bg-charcoal/70 text-xl text-main shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-main hover:bg-charcoal/90"
      >
        {muted ? "🔇" : "🎵"}
      </button>
    </>
  );
}
