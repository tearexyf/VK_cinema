import { type ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: "card" | "plain";
}

export function Modal({ isOpen, onClose, children, variant = "card" }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={`${styles.content} ${variant === "plain" ? styles.plain : ""}`} onClick={(e) => e.stopPropagation()}>
        <button className={`${styles.closeButton} ${variant === "plain" ? styles.closeButtonPlain : ""}`} onClick={onClose} aria-label="Закрыть">
          <X size={18} />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}