import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";

function RQSuperHeroPage() {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useSuperHeroData(heroId as string);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      {data?.name} - {data?.alterEgo}
    </div>
  );
}

export default RQSuperHeroPage;
