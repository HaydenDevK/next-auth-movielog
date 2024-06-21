"use server";

import { useSearchedMediaListStore } from "@/store/searchedMediaStore";
import { revalidatePath } from "next/cache";

export const fetchThemedMovies = async (type: string, page = 1) => {
  if (!type) return;

  // await useSearchedMediaListStore
  //   .getState()
  //   .fetchSearchedMediaList(query, page);

  revalidatePath("/my-list");

  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/themed-movies?type=${type}&page=${page}`
    )
  ).json();
};

export const searchMovieAction: TSearchMovieAction = async (formData) => {
  const query = formData.get("query")?.toString();
  const page = formData.get("page")?.toString() ?? "1";

  if (!query) return;

  useSearchedMediaListStore.getState().setSearchKeyword(query);

  await useSearchedMediaListStore
    .getState()
    .fetchSearchedMediaList(query, page);

  revalidatePath("/my-list");
};

export const searchMovieActionMore = async (query: string, page: string) => {
  useSearchedMediaListStore.getState().setSearchKeyword(query);

  await useSearchedMediaListStore
    .getState()
    .fetchMoreSearchedMediaList(query, page);

  revalidatePath("/my-list");
};

export const resetMovieAction = () => {
  useSearchedMediaListStore.getState().reseTSearchedMediaList();
  useSearchedMediaListStore.getState().resetSearchKeyword();
  revalidatePath("/my-list"); // route cache 무효화
};
