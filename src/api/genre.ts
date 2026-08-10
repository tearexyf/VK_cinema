import { getGenres as fetchGenreNames, getMovies } from "./movies";
import type { Genre } from "../types/movie";
import { genreTranslations } from "../utils/genreTranslation";

export const getGenres = async (): Promise<Genre[]> => {
  const genreNames = await fetchGenreNames()

  const genres = await Promise.all(
    genreNames.map(async (name) => {
      const movies = await getMovies({ genre: name, page: 1, limit: 1 })
      const image = movies[0]?.posterUrl ?? "https://picsum.photos/seed/placeholder/500/375"

      return {
        name,
        label: genreTranslations[name] ?? name,
        image,
      }
    })
  )
  return genres
}