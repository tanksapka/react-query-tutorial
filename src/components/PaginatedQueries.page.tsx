import { useState } from "react";
import { useQuery } from "react-query";
import { apiClient } from "../hooks/client";
import { Color } from "../types/Color";

const fetchColors = async (pageNumber: number): Promise<Color[]> => {
  const resp = await apiClient.get(`/colors?_limit=2&_page=${pageNumber}`);
  return resp.data;
};

function PaginatedQueriesPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const { isLoading, isFetching, isError, error, data } = useQuery<Color[], Error>(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.map((color) => (
          <div key={color.id}>
            {color.id}. {color.label}
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => setPageNumber((page) => page - 1)} disabled={pageNumber === 1}>
          Previous page
        </button>
        <button onClick={() => setPageNumber((page) => page + 1)} disabled={pageNumber === 4}>
          Next page
        </button>
      </div>
      {isFetching && "Loading..."}
    </>
  );
}

export default PaginatedQueriesPage;
