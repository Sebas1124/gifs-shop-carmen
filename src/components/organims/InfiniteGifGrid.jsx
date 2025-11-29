import { useInfiniteQuery } from "@tanstack/react-query";
import { getGifs } from "../../api/giphy";
import { LoaderComponent } from "../shared/LoaderComponent";
import { GifCard } from "../molec/GifCard";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";


export const InfiniteGifGrid = ({ category }) => {

    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError
    } = useInfiniteQuery({
      queryKey: ['gifs', category],
      queryFn: ({ pageParam = 0 }) => getGifs({ category, pageParam }),
      getNextPageParam: ( lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length * 20 : undefined;
      }
    });

    const loadMoreRef = useIntersectionObserver({
      onIntersect: fetchNextPage,
      enable: hasNextPage && !isFetchingNextPage // si tiene más pagina y no está cargando
    })

    if ( isLoading ) return <LoaderComponent/>;
    if ( isError ) return <h2>Hubo un error al cargar los gifs de: {category}</h2>;

  return (
    <div className="pb-10">

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
        {
          data?.pages.map((page) => 
            page.map(gif => (
              <GifCard key={gif.id} gif={gif} />
            ))
          )
        }
      </div>

      <div ref={loadMoreRef} className="h-10 mt-6 flex justify-center">
        {
          isFetchingNextPage && <LoaderComponent/>
        }
        {
          !hasNextPage && !data && <p className="text-slate-500">No hay más gifs :(</p>
        }
      </div>

    </div>
  )
}
