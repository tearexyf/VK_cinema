import type { Genre } from "../../types/movie";
import styles from "./GenreCard.module.scss";

interface GenreCardProps {
  genre: Genre;
  onClick: (genreName: string) => void;
}

export function GenreCard({ genre, onClick }: GenreCardProps) {
  return (
    <div className={styles.card} onClick={() => onClick(genre.name)}>
      <img src={genre.image} alt={genre.label} className={styles.image} />
      <div className={styles.label}>
        <span className={styles.name}>{genre.label}</span>
      </div>
    </div>
  )
}