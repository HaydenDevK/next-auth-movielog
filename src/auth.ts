import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./libs/db";
import { User } from "./libs/schema";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      /**
       * @param credentials - user, account
       * @returns true 인증 성공 / false 인증 실패
       * return true 시 jwt -> session 순으로 함수 드리블링
       */
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          throw new CredentialsSignin("입력 값이 부족합니다.");
        }

        // 몽고디비 조회
        connectDB();
        const user = await User.findOne({ email }).select("+password +level"); // password, role은 빼먹지말고 가져와라
        if (!user) {
          throw new CredentialsSignin("유저가 존재하지 않습니다.");
        }

        // 사용자가 입력한 비번과 데이터 상의 비번이 동일한지 체크 (해시)
        const isMatched = await compare(String(password), user.password);
        if (!isMatched) {
          throw new CredentialsSignin("비밀번호가 일치하지 않습니다.");
        }

        // jwt와 session에 유저 정보 리턴
        return {
          name: user.name,
          email: user.email,
          // auth.js 에서 기본 제공하는 key 값이 있는데, level과 id는 없기 때문에 따로 추가해줘야 한다.
          level: user.level,
          id: user._id, // 몽고디비에서 생성해준 id
        };
      },
    }),
    GitHub({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    }),
  ],
});
