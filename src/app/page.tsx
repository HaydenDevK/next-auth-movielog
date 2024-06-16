import HomeBanner from "@/components/HomeBanner";
import HomeHeader from "@/components/HomeHeader";
import TmdbMovieList from "@/components/TmdbMovieList";
import { LIST_THEME } from "@/libs/constant";
import { fetchMovies } from "@/libs/fetch";

export default async function HomePage() {
  const [
    { results: nowPlaying },
    { results: popular },
    { results: topRated },
    { results: upcoming },
  ] = await Promise.all([
    fetchMovies(LIST_THEME.nowPlaying.themeType),
    fetchMovies(LIST_THEME.popular.themeType),
    fetchMovies(LIST_THEME.topRated.themeType),
    fetchMovies(LIST_THEME.upcoming.themeType),
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
