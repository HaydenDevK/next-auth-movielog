import HomeBanner from "@/components/HomeBanner";
import HomeHeader from "@/components/HomeHeader";
import TmdbMovieList from "@/components/TmdbMovieList";
import { LIST_THEME } from "@/libs/constant";
import { fetchThemedMovies } from "@/libs/fetch";
import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

export default async function HomePage() {
  // 홈 페이지는 로그인 상태에서만 접근 가능
  const session = await getSession();
  if (!session) redirect("/login");

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
