import { Fragment } from "react";
import { QueryFunctionContext, useInfiniteQuery } from "react-query";
import { apiClient } from "../hooks/client";
import { Color } from "../types/Color";

const fetchColors = async ({ pageParam = 1 }: QueryFunctionContext): Promise<Color[]> => {
  const resp = await apiClient.get(`/colors?_limit=2&_page=${pageParam}`);
  return resp.data;
};

function InfiniteQueriesPage() {
  const { isLoading, isError, error, data, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery<Color[], Error>(["colors"], fetchColors, {
      getNextPageParam: (_lastPage, pages) => {
        return pages.length < 4 ? pages.length + 1 : undefined;
      },
    });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <div>
        {data?.pages.map((group, idx) => (
          <Fragment key={idx}>
            {group.map((color) => (
              <h2 key={color.id}>
                {color.id}. {color.label}
              </h2>
            ))}
          </Fragment>
        ))}
      </div>
      <button disabled={!hasNextPage} onClick={() => fetchNextPage()}>
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage && "Fetching..."}</div>
    </>
  );
}

export default InfiniteQueriesPage;
