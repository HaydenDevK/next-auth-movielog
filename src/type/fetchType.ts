import { TTmdbMedia } from "./movie";

export type TTmdbResponse = {
  page: number;
  total_pages: number;
  total_results: number;
  results: TTmdbMedia[];
};

export type TFetchSearchedMovieList = (
  query?: FormDataEntryValue,
  page?: number
) => Promise<TTmdbResponse>;
