import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./libs/db";
import { User } from "./libs/schema";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
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
  callbacks: {
    // 크리덴셜도 깃허브도 성공하면 여기로 가는데, 크리덴셜에 있는 값이 깃허브에는 없다
    signIn: async ({ user, account }: { user: any; account: any }) => {
      if (account?.provider === "github") {
        await connectDB();
        // 이미 존재하는 유저인지 조회할 때, 깃허브가 제공하는 id는 유니크하지 않으므로 email + github 를 유니크 id로 처리

        const existingUser = await User.findOne({
          authProviderId: `${user.email}github`,
        });
        if (!existingUser) {
          // 없으면 DB에 추가
          await new User({
            name: user.name,
            email: user.email,
            authProviderId: `${user.email}github`,
            level: "Subscribe",
          }).save();
        } else {
          // 있으면 jwt.token에 level, id을 추가해줘야 한다
          user.level = existingUser.level || "Subscribe";
          user.id = `${user.email}github`; // TODO id가 필요한가 검토
        }
        return true; // 깃허브 로그인 통과!
      } else if (account?.provider === "kakao") {
        await connectDB();

        const existingUser = await User.findOne({
          authProviderId: `${user.email}kakao`,
        });
        if (!existingUser) {
          // 없으면 DB에 추가
          await new User({
            name: user.name,
            email: user.email,
            authProviderId: `${user.email}kakao`,
            level: "Subscribe",
          }).save();
        } else {
          // 있으면 jwt.token에 level, id을 추가해줘야 한다
          console.log(user);
          user.name = user.name;
          user.level = existingUser.level || "Subscribe";
          user.id = `${user.email}kakao`; // TODO id가 필요한가 검토
        }
        return true; // 카카오 로그인 통과!
      } else {
        return true; // 크레덴셜 로그인 통과!
      }
    },
    async jwt({ token, user }: { token: any; user: any }) {
      console.log("jwt", token, user);
      if (user?.level && user?.id) {
        // 내부적으로 몇 번의 callback을 스스로 부르는데 값이 매번 다르다. 그 중 user.level과 user.id가 있을 때를 캐치해서 token에 level을 추가해줘야 한다.
        token.level = user.level;
        token.id = user.id; // TODO id가 필요한가 검토
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      console.log("session", session, token);
      if (token?.level && token?.id) {
        // 내부적으로 몇 번의 callback을 스스로 부르는데 값이 매번 다르다. 그 중 token에 level, id가 있을 때를 캐치해서 session에 level, id를 추가해줘야 한다.
        session.user.level = token.level;
        session.user.id = token.id; // TODO id가 필요한가 검토
      }
      return session;
    },
  },
});
