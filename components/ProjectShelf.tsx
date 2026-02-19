"use client";

import { useState, useEffect, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import PhoneDevice from "@/components/devices/PhoneDevice";
import LaptopDevice from "@/components/devices/LaptopDevice";
import ClipboardDevice from "@/components/devices/ClipboardDevice";
import TVDevice from "@/components/devices/TVDevice";
import type { Project } from "@/data/projects";

// Caption container width — wide enough for full text without clamping
const CAPTION_W = 320;

interface ProjectShelfProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProjectShelf({ visible, onClose }: ProjectShelfProps) {
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [visible, onClose]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="bookshelf-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="bookshelf-close"
            onClick={onClose}
            aria-label="Close projects"
          >
            ×
          </button>

          {/* Desktop: floating 2×2 scene */}
          <div className="bookshelf-scene project-shelf-scene project-shelf-desktop">
            <AnimatePresence>
              {projects.map((project, i) => (
                <ProjectDevice key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: scrollable 2-column grid with full-size captions */}
          <div className="project-shelf-mobile">
            {projects.map((project) => {
              const mScale = 0.37;
              const vW = Math.round(project.w * mScale);
              const vH = Math.round(project.h * mScale);
              return (
                <div key={project.id} className="project-mobile-card">
                  <div style={{ width: vW, height: vH, overflow: "hidden", margin: "0 auto" }}>
                    <div style={{ transform: `scale(${mScale})`, transformOrigin: "top left", width: project.w, height: project.h }}>
                      <DeviceFrame project={project} />
                    </div>
                  </div>
                  <p className="device-caption">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-mobile-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          <p className="bookshelf-hint">drag devices · interact with screens</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectDevice({ project, index }: { project: Project; index: number }) {
  const [isDragging, setIsDragging] = useState(false);
  const { w, h, x, y, scale, floatDuration, floatDelay } = project;

  const vW = Math.round(w * scale);
  const vH = Math.round(h * scale);
  // Container is always at least CAPTION_W so text has room to breathe
  const cW = Math.max(vW, CAPTION_W);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        // Center the container at (x, y)
        left: `calc(50% + ${x - cW / 2}px)`,
        top: `calc(50% + ${y - vH / 2}px)`,
        width: cW,
      }}
    >
      <motion.div
        drag
        dragMomentum={false}
        style={{
          width: cW,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      >
        {/* Float: bobs gently, wraps only the device */}
        <div
          className="device-float-wrapper"
          style={
            {
              "--float-dur": `${floatDuration}s`,
              animationDelay: `${floatDelay}s`,
            } as CSSProperties
          }
        >
          {/* Clip: layout = visual size, centered in wider container */}
          <div style={{ width: vW, height: vH, overflow: "hidden", margin: "0 auto" }}>
            {/* Scale: CSS transform only, no layout bleed */}
            <div
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                width: w,
                height: h,
              }}
            >
              <DeviceFrame project={project} />
            </div>
          </div>
        </div>

        {/* Caption sits outside the float so it stays steady */}
        <div style={project.captionOffset ? { marginTop: project.captionOffset } : undefined}>
        <p className="device-caption">{project.description}</p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: 8,
              fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace",
              fontSize: 11,
              letterSpacing: "0.10em",
              color: "rgba(240,237,232,0.55)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(240,237,232,0.22)",
              paddingBottom: 1,
              width: "fit-content",
              margin: "8px auto 0",
              transition: "color 0.2s ease, border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,237,232,0.9)";
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(240,237,232,0.6)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,237,232,0.55)";
              (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "rgba(240,237,232,0.22)";
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
          </a>
        )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function DeviceFrame({ project }: { project: Project }) {
  switch (project.device) {
    case "phone":
      return <PhoneDevice deviceScale={project.scale} />;
    case "laptop":
      return <LaptopDevice />;
    case "clipboard":
      return <ClipboardDevice />;
    case "tv":
      return <TVDevice />;
  }
}
