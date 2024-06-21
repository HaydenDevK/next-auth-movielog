import HomeBanner from "@/components/HomeBanner";
import HomeHeader from "@/components/HomeHeader";
import TmdbMovieList from "@/components/TmdbMovieList";
import { LIST_THEME } from "@/libs/constant";
import { fetchThemedMovies } from "@/libs/fetch";

export default async function HomePage() {
  const [
    { results: nowPlaying },
    { results: popular },
    { results: topRated },
    { results: upcoming },
  ] = await Promise.all([
    fetchThemedMovies(LIST_THEME.nowPlaying.themeType),
    fetchThemedMovies(LIST_THEME.popular.themeType),
    fetchThemedMovies(LIST_THEME.topRated.themeType),
    fetchThemedMovies(LIST_THEME.upcoming.themeType),
  ]);
  return (
    <main>
      <HomeHeader />
      <HomeBanner />
      <section className="flex flex-col gap-1 bg-white">
        <TmdbMovieList movieList={nowPlaying} themeKey="nowPlaying" isHome />
        <TmdbMovieList movieList={popular} themeKey="popular" isHome />
        <TmdbMovieList movieList={topRated} themeKey="topRated" isHome />
        <TmdbMovieList movieList={upcoming} themeKey="upcoming" isHome />
      </section>
    </main>
  );
}
