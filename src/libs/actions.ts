"use server";

import { useSearchedMediaListStore } from "@/store/searchedMediaStore";
import { revalidatePath } from "next/cache";
import { connectDB } from "./db";
import { User } from "./schema";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

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

// 회원가입
export async function signupAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string; // 비밀번호는 유출 대비 해시로 암호화

  if (!name || !email || !password) {
    console.log("필수 입력 값을 모두 입력 해주세요.");
  }

  connectDB();

  // 존재하는 회원인지 조회
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    console.log("이미 존재하는 회원입니다.");
  }

  // 없는 회원이면 DB 넣기
  const hashedPassword = await hash(String(password), 10);
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();
  redirect("/");
}
