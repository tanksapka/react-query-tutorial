import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

interface SuperHero {
  id: number;
  name: string;
  alterEgo: string;
}

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

function RQSuperHeroes() {
  const [interval, setInterval] = useState<number | false>(3000);

  const onSuccess = (data: AxiosResponse) => {
    console.log("Perform side effect after data fetching", data);
    if (data.data.length === 4) setInterval(false);
  };

  const onError = (data: Error) => {
    console.log("Perform side effect after encountering error", data);
    if (data.name) setInterval(false);
  };

  const { isLoading, isFetching, isError, error, data } = useQuery<AxiosResponse, Error>(
    "super-heroes",
    fetchSuperHeroes,
    {
      // enabled: false,
      refetchInterval: interval,
      onSuccess,
      onError,
    }
  );

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <h2>RQSuperHeroes</h2>
      {/* <button onClick={() => refetch()}>Fetch heroes</button> */}
      {data?.data.map((hero: SuperHero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </>
  );
}

export default RQSuperHeroes;
