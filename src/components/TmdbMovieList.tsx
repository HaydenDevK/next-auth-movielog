import { TTmdbMovie } from "@/type/movie";
import Title from "./Title";
import MovieCard from "./MovieCard";

type TTmdbMovieListProps = {
  title: string;
  subTitle: string;
  movieList: TTmdbMovie[];
};

export default async function TmdbMovieList(props: TTmdbMovieListProps) {
  const { title, subTitle, movieList } = props;
  return (
    <article className="py-16 px-4 border-t-2 border-t-white bg-black ">
      <section>
        <Title className="mb-8 text-white" h1Text={title} h2Text={subTitle} />
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-0">
          {movieList &&
            movieList.map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      </section>
    </article>
  );
}
