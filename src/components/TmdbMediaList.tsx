import { TThemeType, TTmdbMedia } from "@/type/movie";
import Title from "./Title";
import MovieCard from "./MovieCard";
import Link from "next/link";
import { MdReadMore } from "react-icons/md";
import Loader from "./Loader";
import { fetchThemedMediasAction } from "@/libs/actions";

type TTmdbMovieListProps = {
  theme: TThemeType;
  isHome?: boolean;
};

export default async function TmdbMediaList(props: TTmdbMovieListProps) {
  const { isHome, theme } = props;
  const { themeType, title, subTitle } = theme;
  const { results: mediaList } = await fetchThemedMediasAction(themeType, 7);

  // await new Promise((resolve) => setTimeout(resolve, 5000));
  // const mediaList: TTmdbMedia[] = [];

  return (
    <article className="py-16 px-4 border-t-2 bg-black">
      <div className="flex items-start justify-between mb-8">
        <Title className="text-white" h1Text={title} h2Text={subTitle} />
        {isHome && (
          <Link
            className="flex items-center gap-2 text-white"
            href={`/themed-list/${themeType}`}
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
        {mediaList &&
          mediaList.map((media) => <MovieCard key={media.id} {...media} />)}
      </div>
      {!isHome && (
        <Loader
          handleInView={() => {
            // fetchThemedMoviesMoreAction(
            //   LIST_THEME[themeKey].themeType,
            //   pageRef.current
            // );
          }}
        />
      )}
    </article>
  );
}
