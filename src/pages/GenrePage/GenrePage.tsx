import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { getMovies } from "../../api/movies";
import { MoviePosterCard } from "../../components/MoviePoster/MoviePoster";
import { Loader } from "../../components/Loader/Loader";
import { useFavorites } from "../../hooks/useFavorites";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { genreTranslations } from "../../utils/genreTranslation";
import styles from "./GenrePage.module.scss";

const PAGE_SIZE = 10

export function GenrePage() {
  const { genreName } = useParams<{ genreName: string }>()
  const [movies, setMovies] = useState<Movie[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [trailerMovieId, setTrailerMovieId] = useState<number | null>(null)
  const { isFavorite, toggle } = useFavorites()

  const observerTarget = useRef<HTMLDivElement>(null)

  const displayName = genreName ? genreTranslations[genreName] ?? genreName : ""

  useEffect(() => {
    setMovies([])
    setPage(1)
    setHasMore(true)
  }, [genreName])

  useEffect(() => {
    if (!genreName || !hasMore) return

    setIsLoading(true)
    getMovies({ genre: genreName, page, limit: PAGE_SIZE })
      .then((newMovies) => {
        setMovies((prev) => (page === 1 ? newMovies : [...prev, ...newMovies]))
        setHasMore(newMovies.length === PAGE_SIZE)
      })
      .finally(() => setIsLoading(false))
  }, [genreName, page, hasMore])

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1)
    }
  }, [isLoading, hasMore])

  useEffect(() => {
    const target = observerTarget.current
    if (!target) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore()
      },
      { threshold: 1 }
    )

    observer.observe(target)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{displayName}</h1>

      <div className={styles.grid}>
        {movies.map((movie) => (
          <MoviePosterCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={toggle}
          />
        ))}
      </div>

      {isLoading && <Loader />}
      {!isLoading && movies.length === 0 && <p className={styles.emptyText}>Фильмы не найдены</p>}

      <div ref={observerTarget} style={{ height: 1 }} />

      {trailerMovieId !== null && (
        <TrailerModal movieId={trailerMovieId} onClose={() => setTrailerMovieId(null)} />
      )}
    </div>
  )
}