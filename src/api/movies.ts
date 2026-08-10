import axiosInstance from "./axiosInstance";
import type { Movie, MovieFilters } from "../types/movie";

export const getRandomMovie = async (): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>("/movie/random");
  return response.data;
};

export const getTopMovies = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/movie/top10");
  return response.data;
};

export const getMovieById = async (movieId: number): Promise<Movie> => {
  const response = await axiosInstance.get<Movie>(`/movie/${movieId}`);
  return response.data;
};

export const getMovies = async (filters: MovieFilters): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/movie", {
    params: filters,
  });
  return response.data;
};

export const getGenres = async (): Promise<string[]> => {
  const response = await axiosInstance.get<string[]>("/movie/genres");
  return response.data;
};