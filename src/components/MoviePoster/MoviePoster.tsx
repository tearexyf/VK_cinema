import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import styles from "./MoviePoster.module.scss";

interface MoviePosterCardProps {
  movie: Movie;
  rank?: number; 
  isFavorite?: boolean;
  onToggleFavorite?: (movieId: number) => void;
  onRemove?: (movieId: number) => void;
}

export function MoviePosterCard({ movie, rank, isFavorite, onToggleFavorite, onRemove }: MoviePosterCardProps) {
  const navigate = useNavigate()

  return (
    <div className={styles.card} onClick={() => navigate(`/movie/${movie.id}`)}>
      {rank !== undefined && <span className={styles.rank}>{rank}</span>}

      <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />

      <div className={styles.overlay}>
        {onToggleFavorite && (
          <button
            className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(movie.id);
            }}
          >
            <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}

        {onRemove && (
          <button
            className={styles.removeButton}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(movie.id);
            }}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}