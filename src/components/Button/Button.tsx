import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  children: ReactNode
}

export function Button({ variant = "primary", children, className, ...rest }: ButtonProps) {
  const variantClass = variant === "primary" ? styles.primary : styles.secondary

  return (
    <button className={`${styles.button} ${variantClass} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  )
}