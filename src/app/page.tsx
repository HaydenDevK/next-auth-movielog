import HomeBanner from "@/components/HomeBanner";
import HomeHeader from "@/components/HomeHeader";
import TmdbMovieList from "@/components/TmdbMovieList";

export const getMovies = async (type: string, page = 1) =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/tmdb-movies?type=${type}&page=${page}`
    )
  ).json();

export default async function HomePage() {
  const [
    { results: nowPlaying },
    { results: popular },
    { results: topRated },
    { results: upcoming },
  ] = await Promise.all([
    getMovies("now_playing"),
    getMovies("popular"),
    getMovies("top_rated"),
    getMovies("upcoming"),
  ]);
  return (
    <main>
      <HomeHeader />
      <HomeBanner />
      <TmdbMovieList
        movieList={nowPlaying}
        title="NOW PLAYING"
        subTitle="현재 극장에서 상영 중인 작품들이에요 🍿"
      />
      <TmdbMovieList
        movieList={popular}
        title="POPULAR"
        subTitle="지금 인기있는 작품들이에요 🔥"
      />
      <TmdbMovieList
        movieList={topRated}
        title="TOP RATED"
        subTitle="평가가 높은 작품들이에요 🌟"
      />
      <TmdbMovieList
        movieList={upcoming}
        title="UPCOMING"
        subTitle="개봉 예정 작품들이에요 𝌗"
      />
    </main>
  );
}
