import { useQuery } from "react-query";
import { SuperHero } from "../types/SuperHero";
import { apiClient } from "./client";

const fetchSuperHeroes = async (): Promise<SuperHero[]> => {
  const resp = await apiClient.get("");
  return resp.data;
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery<SuperHero[], Error>("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};
