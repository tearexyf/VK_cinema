import { type InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  icon?: React.ReactNode;
  backgroundColor?:"white"|"black";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError, icon, className, backgroundColor = "white", ...rest }, ref) => {
    const variantClass = backgroundColor === "black" ? styles.dark : styles.light

    return (
      <div className={`${styles.wrapper} ${variantClass} ${hasError ? styles.error : ""} ${className ?? ""}`}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input ref={ref} className={styles.input} {...rest} />
      </div>
    )
  }
)

Input.displayName = "Input"