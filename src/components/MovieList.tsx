import { TMovie } from "@/type/movie";
import MovieItem from "./MovieItem";

const sampleList = [
  {
    id: 1,
    title: "111",
    watched: false,
  },
  {
    id: 2,
    title: "222",
    watched: true,
  },
  {
    id: 3,
    title: "333",
    watched: false,
  },
  {
    id: 4,
    title: "444",
    watched: true,
  },
];

export default function MovieList({ movieList }: { movieList: TMovie[] }) {
  return (
    <>
      <h3 className="mt-8 mb-3 text-md font-[500] leading-normal">
        내가 본 / 볼 작품 ᐠ( ¨̮ )ᐟ
      </h3>
      <ul className="flex flex-col gap-4 mt-4">
        {sampleList &&
          sampleList.map((movie) => <MovieItem key={movie.id} movie={movie} />)}
      </ul>
    </>
  );
}
