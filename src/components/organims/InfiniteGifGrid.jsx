import { useInfiniteQuery } from "@tanstack/react-query";
import { getGifs } from "../../api/giphy";


export const InfiniteGifGrid = ({  category }) => {

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError
    } = useInfiniteQuery({
        queryKey: ['patatas', category],
        queryFn: ({ pageParam = 0 }) => getGifs({ category, pageParam }),
        getNextPageParam: ( lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length * 20 : undefined;
        }
    });

  return (
    <div>InfiniteGifGrid</div>
  )
}
