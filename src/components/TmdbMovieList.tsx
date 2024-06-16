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
    <article className="bg-black py-10 px-4 xs:px-0">
      <section>
        <Title className="mb-4 text-white" h1Text={title} h2Text={subTitle} />
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-0">
          {movieList &&
            movieList.map((movie) => <MovieCard key={movie.id} {...movie} />)}
        </div>
      </section>
    </article>
  );
}
