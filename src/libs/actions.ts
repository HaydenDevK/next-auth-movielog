"use server";

import { useSearchedMediaListStore } from "@/store/searchedMediaStore";
import { revalidatePath } from "next/cache";
import { connectDB } from "./db";
import { User } from "./schema";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { TTmdbResponse } from "@/type/movie";

type fetchThemedMedias = (
  type: string,
  page?: number
) => Promise<TTmdbResponse>;

export const fetchThemedMediasAction: fetchThemedMedias = async (
  type,
  page = 1
) => {
  if (!type) return;

  // revalidatePath("/");
  // 여기서 캐시를 revalidatePath 해줘야 하는가? route cache나 data cache를 날리고 싶은가?
  return await (
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/themed-movies?type=${type}&page=${page}`
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
  let redirectPath = "";
  const name = formData.get("name")?.toString()?.trim();
  const email = formData.get("email")?.toString()?.trim();
  const password = formData.get("password")?.toString()?.trim();

  try {
    // 몽고디비 연결
    connectDB();

    // 입력값 발리데이션
    if (!name || !email || !password) {
      throw new Error("필수 입력 값을 모두 입력 해주세요.");
    }

    // 존재하는 회원인지 조회
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("이미 존재하는 회원입니다.");
    }

    // 없는 회원이면 DB 넣기
    const hashedPassword = await hash(String(password), 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    redirectPath = "/login";
    console.log("회원가입 성공");
  } catch (error) {
    throw new Error(`회원가입 실패 : ${error}`);
  }
  if (redirectPath !== "") redirect(redirectPath);
}

// 로그인
export async function loginAction(formData: FormData) {
  let redirectPath = "";
  const email = formData.get("email")?.toString()?.trim();
  const password = formData.get("password")?.toString()?.trim();

  try {
    // 입력값 발리데이션
    if (!email || !password) {
      throw new Error("이메일과 패스워드를 입력해주세요.");
    }

    // auth.js 연동
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
    console.log("로그인 성공");
    redirectPath = "/";
  } catch (error) {
    throw new Error(`로그인 실패 : ${error}`);
  }
  if (redirectPath !== "") redirect(redirectPath);
}

// 로그아웃
export async function logoutAction() {
  await signOut(); // auth 폴더에 있는거!
  redirect("/login");
}

export async function githubLoginAction() {
  await signIn("github", { callbackUrl: "/" });
}

export async function kakaoLoginAction() {
  await signIn("kakao", { callbackUrl: "/" });
}
