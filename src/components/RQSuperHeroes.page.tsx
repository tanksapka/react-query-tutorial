import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddSuperHeroData, useSuperHeroesData } from "../hooks/useSuperHeroesData";
import { SuperHero } from "../types/SuperHero";

function RQSuperHeroes() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = (data: SuperHero[]) => {
    console.log("Perform side effect after data fetching", data);
  };

  const onError = (data: Error) => {
    console.log("Perform side effect after encountering error", data);
  };

  const { isLoading, isFetching, isError, error, data, refetch } = useSuperHeroesData(onSuccess, onError);
  const { mutate: addHero } = useAddSuperHeroData();

  const handleAddHeroClick = () => {
    console.log({ name, alterEgo });
    const hero = { name, alterEgo };
    addHero(hero);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroes</h2>
      <div>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} autoComplete="off" />
        <input type="text" value={alterEgo} onChange={(e) => setAlterEgo(e.target.value)} autoComplete="off" />
        <button onClick={handleAddHeroClick}>Add hero</button>
      </div>
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
