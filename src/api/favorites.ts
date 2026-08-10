import axiosInstance from "./axiosInstance";
import type { Movie } from "../types/movie";
import type { SuccessfulResult } from "../types/user";

export const getFavorites = async (): Promise<Movie[]> => {
  const response = await axiosInstance.get<Movie[]>("/favorites")
  return response.data
};

export const addToFavorites = async (
  movieId: string
): Promise<SuccessfulResult> => {
  const response = await axiosInstance.post<SuccessfulResult>("/favorites", {
    id: movieId,
  });
  return response.data
};

export const removeFromFavorites = async (
  movieId: string
): Promise<SuccessfulResult> => {
  const response = await axiosInstance.delete<SuccessfulResult>(
    `/favorites/${movieId}`
  );
  return response.data
};