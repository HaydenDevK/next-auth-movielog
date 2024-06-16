import Title from "@/components/Title";
import TmdbMovieList from "@/components/TmdbMovieList";
import { LIST_THEME } from "@/libs/constant";
import { fetchMovies } from "@/libs/fetch";
import { TThemeKey } from "@/type/movie";

type TThemedListPageProps = {
  params: {
    themeKey: TThemeKey;
  };
};

export default async function ThemedListPage({ params }: TThemedListPageProps) {
  const { themeKey } = params;

  const { results: movieList } = await fetchMovies(
    LIST_THEME[themeKey].themeType
  );

  return (
    <main>
      <TmdbMovieList movieList={movieList} themeKey={themeKey} />
    </main>
  );
  return null;
}
