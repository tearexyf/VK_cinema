import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { logout } from "../../store/authSlice";
import { useFavorites } from "../../hooks/useFavorites";
import { MoviePosterCard } from "../../components/MoviePoster/MoviePoster";
import { Button } from "../../components/Button/Button";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { Heart, User } from "lucide-react";
import styles from "./AccountPage.module.scss";

type Tab = "favorites" | "settings"

export function AccountPage() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.auth.user)
  const { favorites, toggle } = useFavorites()

  const [activeTab, setActiveTab] = useState<Tab>("favorites")
  const [trailerMovieId, setTrailerMovieId] = useState<number | null>(null)

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate("/"))
  };

  if (!user) return null

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мой аккаунт</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "favorites" ? styles.active : ""}`}
          onClick={() => setActiveTab("favorites")}
        >
          <Heart size={16} />
          Избранное
        </button>
        <button
          className={`${styles.tab} ${activeTab === "settings" ? styles.active : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <User size={16} />
          Настройки
        </button>
      </div>

      {activeTab === "favorites" && (
        <>
          {favorites.length === 0 && <p className={styles.emptyText}>Пока нет фильмов в избранном</p>}

          <div className={styles.grid}>
            {favorites.map((movie) => (
              <MoviePosterCard
                key={movie.id}
                movie={movie}
                onRemove={toggle}
              />
            ))}
          </div>
        </>
      )}

      {activeTab === "settings" && (
        <div className={styles.settings}>
          <div className={styles.settingsRow}>
            <div className={styles.avatar}>
              {user.name[0]}
              {user.surname[0]}
            </div>
            <div>
              <p className={styles.fieldLabel}>Имя Фамилия</p>
              <p className={styles.fieldValue}>{user.name} {user.surname}</p>
            </div>
          </div>

          <div className={styles.settingsRow}>
            <div className={styles.avatar}>
              <User size={18} />
            </div>
            <div>
              <p className={styles.fieldLabel}>Электронная почта</p>
              <p className={styles.fieldValue}>{user.email}</p>
            </div>
          </div>

          <Button variant="primary" onClick={handleLogout} className={styles.logoutButton}>
            Выйти из аккаунта
          </Button>
        </div>
      )}

      {trailerMovieId !== null && (
        <TrailerModal movieId={trailerMovieId} onClose={() => setTrailerMovieId(null)} />
      )}
    </div>
  )
}