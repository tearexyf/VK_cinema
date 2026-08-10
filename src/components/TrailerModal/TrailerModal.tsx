import { useState, useEffect } from "react";
import { Modal } from "../Modal/Modal";
import { Loader } from "../Loader/Loader";
import { getMovieById } from "../../api/movies";
import styles from "./TrailerModal.module.scss";

interface TrailerModalProps {
  movieId: number
  onClose: () => void
}

export function TrailerModal({ movieId, onClose }: TrailerModalProps) {
  const [trailerYouTubeId, setTrailerYouTubeId] = useState<string | null>(null)

  useEffect(() => {
    getMovieById(movieId).then((movie) => setTrailerYouTubeId(movie.trailerYouTubeId))
  }, [movieId])

  return (
    <Modal isOpen onClose={onClose}>
      <div className={styles.videoWrapper}>
        {!trailerYouTubeId && <Loader />}
        {trailerYouTubeId && (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube.com/embed/${trailerYouTubeId}?autoplay=1`}
            title="Трейлер"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        )}
      </div>
    </Modal>
  )
}