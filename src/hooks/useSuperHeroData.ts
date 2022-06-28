import axios, { AxiosResponse } from "axios";
import { QueryKey, useQuery } from "react-query";

const fetchSuperHero = ({ queryKey }: { queryKey: QueryKey }) =>
  axios.get(`http://localhost:4000/superheroes/${queryKey?.[1]}`);

export const useSuperHeroData = (heroId: string) => {
  return useQuery<AxiosResponse, Error>(["super-hero", heroId], fetchSuperHero);
};
