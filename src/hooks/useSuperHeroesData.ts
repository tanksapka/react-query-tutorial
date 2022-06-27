import axios, { AxiosResponse } from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery<AxiosResponse, Error>("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};
