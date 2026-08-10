import { Heart, RotateCw} from "lucide-react";
import type { Movie } from "../../types/movie";
import styles from "./MovieCard.module.scss";
import { useNavigate } from "react-router-dom";


interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movieId: number) => void;
  onOpenTrailer: (movieId: number) => void;
  onRandom?: () => void;
}

export function MovieCard({ movie, isFavorite, onToggleFavorite, onOpenTrailer,onRandom }: MovieCardProps) {
  const ratingClass = getRatingClass(movie.tmdbRating)
  const navigate = useNavigate()

  return (
    <div className={styles.card}>
      <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={`${styles.rating} ${ratingClass}`}>★ {String(movie.tmdbRating).replace(".", ",")}</span>
          <span>{movie.releaseYear}</span>
          <span>{movie.genres[0]}</span>
          <span>{formatRuntime(movie.runtime)}</span>
        </div>

        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.plot}>{movie.plot}</p>

        <div className={styles.actions}>
          <button className={styles.trailerButton} onClick={() => onOpenTrailer(movie.id)}>
            Трейлер
          </button>
          <button className={styles.infoButton} onClick={() => navigate(`/movie/${movie.id}`)}>
            О фильме
          </button>
          <button
            className={`${styles.favoriteButton} ${isFavorite ? styles.active : ""}`}
            onClick={() => onToggleFavorite(movie.id)}
            aria-label="Добавить в избранное"
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          {onRandom && (
            <button className={styles.refreshButton} onClick={onRandom} aria-label="Другой фильм">
              <RotateCw size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function getRatingClass(rating: number): string {
  if (rating >= 7) return styles.ratingHigh
  if (rating >= 5) return styles.ratingMid
  return styles.ratingLow
}

function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return `${hours} ч ${rest} мин`
}