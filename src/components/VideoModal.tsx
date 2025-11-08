import React, { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  src: string;
  muted?: boolean;
};

export default function VideoModal({ open, onClose, src, muted = true }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.currentTime = 0;
      const p = videoRef.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } else if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
        zIndex: 9999
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(960px,95%)", maxHeight: "90vh", borderRadius: 8, overflow: "hidden", position: "relative" }}
      >
        <button
          onClick={onClose}
          style={{ position: "absolute", right: 12, top: 12, zIndex: 10001, padding: "6px 10px", borderRadius: 6, border: "none", background: "#fff", cursor: "pointer", fontWeight: 700 }}
        >
          X
        </button>
        <video ref={videoRef} controls playsInline muted={muted} style={{ width: "100%", height: "auto", display: "block", background: "#000" }}>
          <source src={src} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      </div>
    </div>
  );
}
