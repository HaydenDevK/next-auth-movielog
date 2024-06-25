import HomeBanner from "@/components/HomeBanner";
import HomeHeader from "@/components/HomeHeader";
import TmdbMediaList from "@/components/TmdbMediaList";
import TmdbMovieList from "@/components/TmdbMovieList";
import { LIST_THEME } from "@/libs/constant";
import { fetchThemedMovies } from "@/libs/fetch";
import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function HomePage() {
  // 홈 페이지는 로그인 상태에서만 접근 가능
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <main>
      <HomeHeader />
      <section className="flex flex-col gap-1 bg-white">
        {/* TODO suspense 테스트 적용. 너~무 순간이라 필요 없을 듯 하므로 검토하기 */}
        <Suspense
          fallback={
            <main className="w-full h-[687px] flex items-center justify-center bg-white text-white text-[100px]">
              Loading...
            </main>
          }
        >
          <TmdbMediaList theme={LIST_THEME.nowPlaying} isHome />
        </Suspense>
        <Suspense
          fallback={
            <main className="w-full h-[687px] flex items-center justify-center bg-rose-500 text-white text-[100px]">
              Loading...
            </main>
          }
        >
          <TmdbMediaList theme={LIST_THEME.popular} isHome />
        </Suspense>
        <Suspense
          fallback={
            <main className="w-full h-[687px] flex items-center justify-center bg-rose-500 text-white text-[100px]">
              Loading...
            </main>
          }
        >
          <TmdbMediaList theme={LIST_THEME.topRated} isHome />
        </Suspense>
        <Suspense
          fallback={
            <main className="w-full h-[687px] flex items-center justify-center bg-rose-500 text-white text-[100px]">
              Loading...
            </main>
          }
        >
          <TmdbMediaList theme={LIST_THEME.upcoming} isHome />
        </Suspense>
      </section>
    </main>
  );
}
