import { AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { SuperHero } from "../types/SuperHero";
import { apiClient } from "./client";

const fetchSuperHeroes = async (): Promise<SuperHero[]> => {
  const resp = await apiClient.get("/superheroes");
  return resp.data;
};

const addSuperHero = async (hero: Omit<SuperHero, "id">) => {
  return apiClient.post("/superheroes", hero);
};

export const useSuperHeroesData = (onSuccess: any, onError: any) => {
  return useQuery<SuperHero[], Error>("super-heroes", fetchSuperHeroes, {
    onSuccess,
    onError,
  });
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero, {
    // onSuccess: (data: AxiosResponse<SuperHero>) => {
    //   // queryClient.invalidateQueries("super-heroes");
    //   queryClient.setQueryData<SuperHero[]>("super-heroes", (oldQueryData: SuperHero[] | undefined): SuperHero[] => {
    //     return oldQueryData ? [...oldQueryData, data.data] : [data.data];
    //   });
    // },
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heroes");
      const previousHeroData = queryClient.getQueryData("super-heroes");
      queryClient.setQueryData<SuperHero[]>("super-heroes", (oldQueryData: SuperHero[] | undefined): SuperHero[] => {
        return oldQueryData ? [...oldQueryData, { id: oldQueryData.length + 1, ...newHero }] : [{ id: 1, ...newHero }];
      });
      return previousHeroData;
    },
    onError: (_error, _hero, context: any) => {
      queryClient.setQueryData("super-heroes", context.previousHeroData);
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heroes");
    },
  });
};
