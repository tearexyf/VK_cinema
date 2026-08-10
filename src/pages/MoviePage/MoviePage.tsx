import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { getMovieById } from "../../api/movies";
import { Loader } from "../../components/Loader/Loader";
import { Button } from "../../components/Button/Button";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { useFavorites } from "../../hooks/useFavorites";
import { Heart } from "lucide-react";
import styles from "./MoviePage.module.scss";

export function MoviePage() {
  const { id } = useParams<{ id: string }>()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [isTrailerOpen, setIsTrailerOpen] = useState(false)
  const { isFavorite, toggle } = useFavorites()

  useEffect(() => {
    if (id) {
      getMovieById(Number(id)).then((data) => setMovie(data))
    }
  }, [id])

  if (!movie) return <Loader />

  const favorite = isFavorite(movie.id)

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img src={movie.posterUrl} alt={movie.title} className={styles.poster} />
        <div className={styles.info}>
          <div className={styles.meta}>
            <span>★ {movie.tmdbRating}</span>
            <span>{movie.releaseYear}</span>
            <span>{movie.genres.join(", ")}</span>
            <span>{movie.runtime} мин</span>
          </div>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.plot}>{movie.plot}</p>

          <div className={styles.actions}>
            <Button variant="primary" onClick={() => setIsTrailerOpen(true)}>
              Трейлер
            </Button>
            <button
              className={`${styles.favoriteButton} ${favorite ? styles.active : ""}`}
              onClick={() => toggle(movie.id)}
              aria-label="В избранное"
            >
              <Heart size={20} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </div>

      <section className={styles.details}>
        <h2>О фильме</h2>
        <dl className={styles.detailsList}>
          <div className={styles.detailsRow}>
            <dt>Язык оригинала</dt>
            <dd>{movie.language}</dd>
          </div>
          <div className={styles.detailsRow}>
            <dt>Бюджет</dt>
            <dd>{movie.budget}</dd>
          </div>
          <div className={styles.detailsRow}>
            <dt>Выручка</dt>
            <dd>{movie.revenue}</dd>
          </div>
          <div className={styles.detailsRow}>
            <dt>Режиссёр</dt>
            <dd>{movie.director}</dd>
          </div>
          <div className={styles.detailsRow}>
            <dt>Продакшен</dt>
            <dd>{movie.production}</dd>
          </div>
          <div className={styles.detailsRow}>
            <dt>Награды</dt>
            <dd>{movie.awardsSummary}</dd>
          </div>
        </dl>
      </section>

      {isTrailerOpen && <TrailerModal movieId={movie.id} onClose={() => setIsTrailerOpen(false)} />}
    </div>
  )
}