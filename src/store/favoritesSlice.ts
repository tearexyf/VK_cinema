import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../types/movie";
import { getFavorites, addToFavorites, removeFromFavorites } from "../api/favorites";

interface FavoritesState {
  movies: Movie[];
  isLoading: boolean;
}

const initialState: FavoritesState = {
  movies: [],
  isLoading: false,
};

export const fetchFavorites = createAsyncThunk("favorites/fetch", async () => {
  const movies = await getFavorites()
  return movies
});

export const toggleFavorite = createAsyncThunk(
  "favorites/toggle",
  async ({ movieId, isFavorite }: { movieId: string; isFavorite: boolean }) => {
    if (isFavorite) {
      await removeFromFavorites(movieId)
    } else {
      await addToFavorites(movieId)
    }
    return { movieId, isFavorite: !isFavorite }
  }
)

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.isLoading = false
        state.movies = action.payload
      })
  },
})

export default favoritesSlice.reducer;