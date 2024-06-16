export type TTmdbMovie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMovie = {
  id: number;
  title: string;
  watched: boolean;
};

export type TThemeType = {
  themeType: "now_playing" | "popular" | "top_rated" | "upcoming";
  title: string;
  subTitle: string;
};

export type TThemeKey = "nowPlaying" | "popular" | "topRated" | "upcoming";
