import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../../types/movie";
import { getMovies } from "../../api/movies";
import { Modal } from "../Modal/Modal";
import { Input } from "../Input/Input";
import { Loader } from "../Loader/Loader";
import styles from "./SearchModal.module.scss";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    const timeoutId = setTimeout(() => {
      getMovies({ title: query })
        .then((movies) => setResults(movies))
        .finally(() => setIsLoading(false))
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleSelect = (movieId: number) => {
    navigate(`/movie/${movieId}`)
    onClose()
    setQuery("")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} variant="plain">
      <div className={styles.wrapper}>
        <Input backgroundColor='black'
          placeholder="Название фильма"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        {isLoading && <Loader />}

        {!isLoading && query && results.length === 0 && <p>Ничего не найдено</p>}

        <ul className={styles.results}>
          {results.map((movie) => (
            <li key={movie.id} className={styles.resultItem} onClick={() => handleSelect(movie.id)}>
              <img src={movie.posterUrl} alt={movie.title} className={styles.thumb} />
              <span>{movie.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  )
}