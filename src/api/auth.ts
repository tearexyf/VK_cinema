import axiosInstance from "./axiosInstance";
import type { User, AuthInfo, RegisterData } from "../types/user";

export const loginUser = async (payload: AuthInfo): Promise<User> => {
  const response = await axiosInstance.post<User>("/auth/login", payload);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await axiosInstance.get("/auth/logout");
};

export const registerUser = async (payload: RegisterData): Promise<User> => {
  const response = await axiosInstance.post<User>("/user", payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>("/profile");
  return response.data;
};