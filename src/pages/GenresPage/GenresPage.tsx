import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Genre } from "../../types/movie";
import { getGenres } from "../../api/genre";
import { GenreCard } from "../../components/GenreCard/GenreCard";
import { Loader } from "../../components/Loader/Loader";
import styles from "./GenresPage.module.scss";

export function GenresPage() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getGenres()
      .then((data) => setGenres(data))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <Loader />

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Жанры фильмов</h1>
      <div className={styles.grid}>
        {genres.map((genre) => (
          <GenreCard key={genre.name} genre={genre} onClick={(name) => navigate(`/genres/${name}`)} />
        ))}
      </div>
    </div>
  )
}