"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Book3D from "@/components/Book3D";
import { books } from "@/data/books";

interface BookShelfProps {
  visible: boolean;
  onClose: () => void;
}

export default function BookShelf({ visible, onClose }: BookShelfProps) {
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
            aria-label="Close library"
          >
            ×
          </button>

          <div className="bookshelf-scene book-shelf-scene">
            <AnimatePresence>
              {books.map((book, i) => (
                <Book3D key={book.id} book={book} index={i} />
              ))}
            </AnimatePresence>
          </div>

          <p className="bookshelf-hint">drag · click to flip</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
