import { useState, useEffect } from "react";
import type { Movie } from "../../types/movie";
import { getRandomMovie, getTopMovies } from "../../api/movies";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import { Loader } from "../../components/Loader/Loader";
import { useFavorites } from "../../hooks/useFavorites";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import styles from "./HomePage.module.scss";
import { MoviePosterCard } from "../../components/MoviePoster/MoviePoster";

export function HomePage() {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null)
  const [topMovies, setTopMovies] = useState<Movie[]>([])
  const [isLoadingTop, setIsLoadingTop] = useState(true)
  const [trailerMovieId, setTrailerMovieId] = useState<number | null>(null)

  const { isFavorite, toggle } = useFavorites()

  const loadRandomMovie = () => {
    getRandomMovie().then((movie) => setRandomMovie(movie))
  }

  useEffect(() => {
    loadRandomMovie()
  }, [])

  useEffect(() => {
    getTopMovies()
      .then((movies) => setTopMovies(movies))
      .finally(() => setIsLoadingTop(false))
  }, [])

  return (
    <div className={styles.page}>
      <section className={styles.randomSection}>
        {!randomMovie && <Loader />}
        {randomMovie && (
          <>
            <MovieCard
              movie={randomMovie}
              isFavorite={isFavorite(randomMovie.id)}
              onToggleFavorite={toggle}
              onOpenTrailer={setTrailerMovieId}
              onRandom={loadRandomMovie}
            />
          </>
        )}
      </section>

      <section>
        <h2 className={styles.sectionTitle}>Топ 10 фильмов</h2>
        {isLoadingTop && <Loader />}
        <div className={styles.topGrid}>
          {topMovies.map((movie, index) => (
            <MoviePosterCard
              key={movie.id}
              movie={movie}
              rank={index + 1}
              isFavorite={isFavorite(movie.id)}
              onToggleFavorite={toggle}
            />
          ))}
        </div>
      </section>

      {trailerMovieId !== null && (
        <TrailerModal movieId={trailerMovieId} onClose={() => setTrailerMovieId(null)} />
      )}
    </div>
  )
}