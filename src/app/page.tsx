import HomeBanner from "@/components/HomeBanner";
import HomeHeader from "@/components/HomeHeader";
import TmdbMovieList from "@/components/TmdbMovieList";
import { TTmdbMovie } from "@/type/movie";

const SAMPLE_LIST = [
  {
    adult: false,
    backdrop_path: "backdrop_path",
    genre_ids: [0, 1],
    id: 0,
    original_language: "original_language",
    original_title: "original_title",
    overview: "overview",
    popularity: 0,
    poster_path: "poster_path",
    release_date: "release_date",
    title: "title",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
  {
    adult: false,
    backdrop_path: "backdrop_path",
    genre_ids: [0, 1],
    id: 1,
    original_language: "original_language",
    original_title: "original_title",
    overview: "overview",
    popularity: 0,
    poster_path: "poster_path",
    release_date: "release_date",
    title: "title2",
    video: false,
    vote_average: 0,
    vote_count: 0,
  },
];
export default function HomePage() {
  return (
    <main>
      <HomeHeader />
      <HomeBanner />
      <TmdbMovieList
        movieList={SAMPLE_LIST}
        title="NOW PLAYING"
        subTitle="지금 인기있는 작품들이에요 🔥"
      />
    </main>
  );
}
