import { TThemeType, TThemeKey } from "@/type/movie";

export const LIST_THEME: Record<TThemeKey, TThemeType> = {
  nowPlaying: {
    themeType: "now_playing",
    title: "NOW PLAYING",
    subTitle: "현재 극장에서 상영 중인 작품들이에요 🍿",
  },
  popular: {
    themeType: "popular",
    title: "POPULAR",
    subTitle: "지금 인기있는 작품들이에요 🔥",
  },
  topRated: {
    themeType: "top_rated",
    title: "TOP RATED",
    subTitle: "평가가 높은 작품들이에요 🌟",
  },
  upcoming: {
    themeType: "upcoming",
    title: "UP COMING",
    subTitle: "개봉 예정 작품들이에요 𝌗",
  },
};
