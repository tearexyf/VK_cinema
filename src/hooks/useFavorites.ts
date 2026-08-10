import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";
import { fetchFavorites, toggleFavorite } from "../store/favoritesSlice";
import { openAuthModal } from "../store/uiSlice";

export function useFavorites() {
  const dispatch = useDispatch<AppDispatch>()
  const favorites = useSelector((state: RootState) => state.favorites.movies)
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites())
    }
  }, [user, dispatch])

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((movie) => movie.id === movieId),
    [favorites]
  )

  const toggle = useCallback(
  (movieId: number) => {
    if (!user) {
      dispatch(openAuthModal())
      return
    }
    dispatch(toggleFavorite({ movieId: String(movieId), isFavorite: isFavorite(movieId) }))
      .then(() => dispatch(fetchFavorites()))
    },
    [dispatch, isFavorite, user]
  )

  return { favorites, isFavorite, toggle, isAuthenticated: !!user }
}