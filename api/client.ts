import axios from "axios";

export const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const toFile = (file: { uri: string; type: string; name: string }) =>
  file as unknown as File;
