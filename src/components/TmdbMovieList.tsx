"use cli";
import { TThemeKey, TTmdbMovie } from "@/type/movie";
import Title from "./Title";
import MovieCard from "./MovieCard";
import Link from "next/link";
import { MdReadMore } from "react-icons/md";
import { LIST_THEME } from "@/libs/constant";
import Loader from "./Loader";

type TTmdbMovieListProps = {
  isHome?: boolean;
  themeKey: TThemeKey;
  movieList: TTmdbMovie[];
};

export default async function TmdbMovieList(props: TTmdbMovieListProps) {
  const { isHome, themeKey, movieList } = props;
  const { title, subTitle } = LIST_THEME[themeKey];

  return (
    <article className="py-16 px-4 border-t-2 bg-black">
      <div className="flex items-start justify-between mb-8">
        <Title className="text-white" h1Text={title} h2Text={subTitle} />
        {isHome && (
          <Link
            className="flex items-center gap-2 text-white"
            href={`/themed-list/${themeKey}`}
          >
            <MdReadMore className="text-[20px]" /> 더보기
          </Link>
        )}
      </div>
      <div
        className={
          isHome
            ? "flex overflow-y-scroll gap-6"
            : "grid gap-6 grid-cols-auto-fill"
        }
      >
        {movieList &&
          movieList.map((movie) => <MovieCard key={movie.id} {...movie} />)}
      </div>
      {!isHome && <Loader path={`/themed-list/${themeKey}`} />}
    </article>
  );
}
