import { QueryKey, useQuery, useQueryClient, UseQueryResult } from "react-query";
import { SuperHero } from "../types/SuperHero";
import { apiClient } from "./client";

const fetchSuperHero = async ({ queryKey }: { queryKey: QueryKey }): Promise<SuperHero> => {
  const resp = await apiClient.get(`/${queryKey?.[1]}`);
  return resp.data;
};

export const useSuperHeroData = (heroId: string) => {
  const queryClient = useQueryClient();
  return useQuery<SuperHero, Error>(["super-hero", heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData<UseQueryResult<SuperHero[], Error>>("super-heroes")
        ?.data?.find((hero: SuperHero) => hero.id === parseInt(heroId));
      return hero ? hero : undefined;
    },
  });
};
