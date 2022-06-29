import axios from "axios";
import { useQueries } from "react-query";

const fetchSuperHero = (heroId: string) => axios.get(`http://localhost:4000/superheroes/${heroId}`);

function DynamicParallelPage({ heroIds }: { heroIds: Array<string> }) {
  const queryResults = useQueries(
    heroIds.map((id) => ({ queryKey: ["super-hero", id], queryFn: () => fetchSuperHero(id) }))
  );

  console.log({ queryResults });

  return <div>DynamicParallelPage</div>;
}

export default DynamicParallelPage;
