import { Link } from "react-router-dom";
import { useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { SuperHero } from "../types/SuperHero";

function RQSuperHeroes() {
  const onSuccess = (data: SuperHero[]) => {
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
      {data?.map((hero) => (
        <div key={hero.id}>
          <Link to={`/rq-super-heroes/${hero.id}`}>{hero.name}</Link>
        </div>
      ))}
    </>
  );
}

export default RQSuperHeroes;
