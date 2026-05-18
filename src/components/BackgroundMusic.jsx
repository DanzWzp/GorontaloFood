import { useEffect, useRef, useState } from "react";
import gambusi from "../assets/gambusigorontalo.mp3";

const START_AT = 5;

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekToStart = () => {
      if (audio.readyState >= 1 && audio.currentTime < START_AT) {
        audio.currentTime = START_AT;
      }
    };

    const startMuted = () => {
      audio.muted = true;
      seekToStart();
      audio.play().catch(() => {});
    };

    const unmute = () => {
      audio.muted = false;
      setMuted(false);
      seekToStart();
      audio.play().catch(() => {});
    };

    const events = [
      "pointerdown",
      "mousedown",
      "touchstart",
      "keydown",
      "click",
    ];
    const onFirstGesture = () => {
      unmute();
      events.forEach((e) => window.removeEventListener(e, onFirstGesture));
    };
    const armGesture = () =>
      events.forEach((e) =>
        window.addEventListener(e, onFirstGesture, {
          once: true,
          passive: true,
        })
      );

    const onLoaded = () => {
      seekToStart();
      startMuted();
    };

    const onEnded = () => {
      audio.currentTime = START_AT;
      audio.play().catch(() => {});
    };

    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnded);
    if (audio.readyState >= 1) onLoaded();
    armGesture();

    return () => {
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnded);
      events.forEach((e) => window.removeEventListener(e, onFirstGesture));
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = !muted;
    audio.muted = next;
    setMuted(next);
    if (!next) {
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
