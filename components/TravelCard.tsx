"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trip } from "@/data/trips";

interface TravelCardProps {
  trip: Trip;
  index: number;
  total: number;
  visible: boolean;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

export default function TravelCard({
  trip,
  index,
  total,
  visible,
  onNext,
  onPrev,
  onClose,
}: TravelCardProps) {
  const hasMedia = Boolean(trip.coverImage);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={trip.id}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 48 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`travel-card${hasMedia ? " travel-card--media" : ""}`}
        >
          {/* ── Cover image ── */}
          {hasMedia && (
            <div className="card-cover">
              <motion.img
                src={trip.coverImage}
                alt={trip.postTitle || trip.label}
                className="card-cover-img"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              />
              {/* Gradient fades image into card background */}
              <div className="card-cover-fade" />
              {/* Post title lives on the image */}
              {trip.postTitle && (
                <div className="card-cover-title">
                  <p className="card-cover-label">{trip.label}</p>
                  <h3 className="card-cover-heading">{trip.postTitle}</h3>
                </div>
              )}
            </div>
          )}

          {/* ── Card body ── */}
          <div className="card-body">
            <div className="trip-counter">
              {index + 1} / {total}
            </div>

            {/* Only show label + city here when there's no cover (no media) */}
            {!hasMedia && (
              <>
                <h2 className="trip-label">{trip.label}</h2>
                <p className="trip-city">
                  {trip.city} · {trip.year}
                </p>
              </>
            )}

            {/* With media: show subtitle + city in compact form */}
            {hasMedia && (
              <p className="trip-city">
                {trip.city} · {trip.year}
              </p>
            )}

            {trip.postSubtitle && (
              <p className="trip-subtitle">{trip.postSubtitle}</p>
            )}

            {trip.substackUrl && (
              <a
                href={trip.substackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="substack-link"
              >
                Read the post ↗
              </a>
            )}

            <div className="card-nav">
              {index > 0 && (
                <button className="nav-btn" onClick={onPrev}>
                  ← Prev
                </button>
              )}
              {index < total - 1 && (
                <button className="nav-btn" onClick={onNext}>
                  Next →
                </button>
              )}
              {index === total - 1 && (
                <button className="nav-btn" onClick={onClose}>
                  Close
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
