import { TTmdbMedia } from "@/type/movie";
import { create } from "zustand";

type TSearchedMediaList = {
  searchKeyword: string;
  setSearchKeyword: (query: string) => void;
  resetSearchKeyword: () => void;
  searchedMediaList: TTmdbMedia[];
  reseTSearchedMediaList: () => void;
  fetchSearchedMediaList: (query: string, page?: string) => Promise<any>;
  fetchMoreSearchedMediaList: (query: string, page?: string) => Promise<any>;
};

export const useSearchedMediaListStore = create<TSearchedMediaList>((set) => ({
  searchKeyword: "",
  setSearchKeyword: (query) => {
    set({ searchKeyword: query });
  },
  resetSearchKeyword: () => {
    set({ searchKeyword: "" });
  },
  searchedMediaList: [],
  reseTSearchedMediaList: () => {
    set({ searchedMediaList: [] });
  },
  fetchSearchedMediaList: async (query, page) => {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/search-movies?query=${query}&page=${page}`;
    const { results: newMediaList } = await (
      await fetch(url, { next: { revalidate: 0 } })
    ).json();
    set({ searchedMediaList: newMediaList });
  },
  fetchMoreSearchedMediaList: async (query, page) => {
    const url = `${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/search-movies?query=${query}&page=${page}`;
    const { results: newMediaList } = await (
      await fetch(url, { next: { revalidate: 0 } })
    ).json();
    set((state) => ({
      searchedMediaList: [...state.searchedMediaList, ...newMediaList],
    }));
  },
}));
