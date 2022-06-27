import { AxiosResponse } from "axios";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

function RQSuperHeroes() {
  const onSuccess = (data: AxiosResponse) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (data: Error) => {
    console.log("Perform side effect after encountering error", data);
  };

  const { isLoading, isFetching, isError, error, data, refetch } = useSuperHeroesData(onSuccess, onError);

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroes</h2>
      <button onClick={() => refetch()}>Fetch heroes</button>
      {data?.data.map((hero: SuperHero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
}

export default RQSuperHeroes;
