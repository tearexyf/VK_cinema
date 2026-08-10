import styles from "./Logo.module.scss"

type LogoProps = {
  className?: string;
  textColor?: string;
}

export function Logo({ textColor }: LogoProps) {
  return (
    <div className={styles.logo}>
      <span className={styles.icon} />
      <span className={styles.text} style={{ color: textColor }}>
        маруся
      </span>
    </div>
  )
}