import axios from "axios";
import { useQuery } from "react-query";

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

const fetchFriends = () => axios.get("http://localhost:4000/friends");

function ParallelQueriesPage() {
  // const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  // const { data: friends } = useQuery("friends", fetchFriends);
  useQuery("super-heroes", fetchSuperHeroes);
  useQuery("friends", fetchFriends);

  return <div>ParallelQueriesPage</div>;
}

export default ParallelQueriesPage;
