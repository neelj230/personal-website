"use client";

import { useState, CSSProperties } from "react";
import { motion } from "framer-motion";
import type { Book } from "@/data/books";

const W = 128;
const H = 180;

interface Book3DProps {
  book: Book;
  index: number;
}

export default function Book3D({ book, index }: Book3DProps) {
  const [flipped, setFlipped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  const cssVars = {
    "--w": `${W}px`,
    "--h": `${H}px`,
    "--d": "22px",
  } as CSSProperties;

  const restingRotateY = book.initialRotateY + 15;
  const hasCover = Boolean(book.coverImage) && !imgFailed;

  return (
    /*
     * OUTER — entrance / exit animation + viewport positioning only.
     * Keeping this separate from drag means animate:{y:0} never fights
     * the drag gesture's own y motion value.
     */
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "absolute",
        left: `calc(50% + ${book.initialX - W / 2}px)`,
        top: `calc(50% + ${book.initialY - H / 2}px)`,
        width: W,
        height: H,
      }}
    >
      {/*
       * DRAG LAYER — explicit dimensions give Framer Motion a clean hit area.
       *
       * transformStyle: preserve-3d is required here so the whileHover scale
       * doesn't flatten the 3-D faces inside.
       *
       * The 3-D visual subtree below has pointer-events: none, which means
       * ALL pointer events (mousedown, pointermove …) land on *this* element
       * rather than on the img or face divs inside — the native browser image
       * drag can never intercept them.
       */}
      <motion.div
        drag
        dragMomentum={false}
        whileHover={{ scale: 1.06 }}
        style={{
          width: W,
          height: H,
          cursor: isDragging ? "grabbing" : "grab",
          userSelect: "none",
          touchAction: "none",
          // Must be set here so the hover scale doesn't flatten 3-D children
          transformStyle: "preserve-3d",
        }}
        onClick={() => {
          if (!isDragging) setFlipped((f) => !f);
        }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      >
        {/*
         * Pure visual layer — pointer-events: none lets every click/drag pass
         * straight through to the drag element above.
         */}
        <div
          style={{
            pointerEvents: "none",
            width: W,
            height: H,
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="book-float-wrapper"
            style={{
              "--float-dur": `${book.floatDuration}s`,
              animationDelay: `${book.floatDelay}s`,
              transformStyle: "preserve-3d",
            } as CSSProperties}
          >
            <motion.div
              className="book-inner"
              animate={{ rotateY: flipped ? 180 : restingRotateY, rotateX: 5 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              style={cssVars}
            >
              {/* ── Cover (front) ── */}
              <div
                className="book-face book-cover"
                style={{ background: book.coverColor, overflow: "hidden" }}
              >
                {book.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    // Prevent the browser's native image drag from stealing
                    // the pointerdown before Framer Motion can see it.
                    draggable={false}
                    onError={() => setImgFailed(true)}
                    style={{
                      position: "absolute",
                      // 2 px inset keeps cover art from butting against
                      // the face border, giving titles room to breathe.
                      inset: 2,
                      width: "calc(100% - 4px)",
                      height: "calc(100% - 4px)",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}

                {/* Fallback typography — shown when no valid image URL */}
                {!hasCover && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px 14px",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-instrument-serif)",
                        fontStyle: "italic",
                        fontSize: "11px",
                        lineHeight: 1.35,
                        color: book.textColor,
                        textAlign: "center",
                        letterSpacing: "0.01em",
                        wordBreak: "break-word",
                      }}
                    >
                      {book.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "ui-monospace, monospace",
                        fontSize: "7px",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: `${book.textColor}99`,
                        textAlign: "center",
                      }}
                    >
                      {book.author}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Spine (left) ── */}
              <div
                className="book-face book-spine"
                style={{ background: book.spineColor }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-instrument-serif)",
                    fontStyle: "italic",
                    fontSize: "8px",
                    color: book.textColor,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "160px",
                    transform: "rotate(90deg)",
                    transformOrigin: "center center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    translate: "-50% -50%",
                    letterSpacing: "0.05em",
                  }}
                >
                  {book.title}
                </span>
              </div>

              {/* ── Pages edge (right) ── */}
              <div className="book-face book-pages" />

              {/* ── Back ── */}
              <div
                className="book-face book-back"
                style={{
                  background: book.spineColor,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 12px",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    fontStyle: "italic",
                    fontSize: "9.5px",
                    lineHeight: 1.55,
                    color: book.textColor,
                    textAlign: "center",
                    opacity: 0.9,
                  }}
                >
                  {book.note}
                </span>
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "7px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: `${book.textColor}77`,
                    textAlign: "center",
                  }}
                >
                  {book.author}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
