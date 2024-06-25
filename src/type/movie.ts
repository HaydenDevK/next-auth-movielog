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

export type TTmdbSeries = {
  backdrop_path: string;
  id: number;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: false;
  name: string;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};

export type TTmdbMedia = TTmdbMovie | TTmdbSeries;

export type TTmdbResponse = {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: TTmdbMedia[];
  total_pages: number;
  total_results: number;
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
