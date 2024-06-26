import { NextAuthConfig } from "next-auth";
import { connectDB } from "./libs/db";
import { User } from "./libs/schema";

export const authConfig = {
  pages: {},
  callbacks: {
    /**
     * 사용자 인증 여부를 확인하고, 인증되지 않은 사용자를 로그인 페이지로 리디렉션
     * @param auth - 인증 정보
     * @param request - 요청 정보
     * @returns 인증 여부에 따라 리디렉션 여부를 반환
     */
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },
    async signIn({ user, account }: { user: any; account: any }) {
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
          authProviderId: account.providerAccountId,
        });

        if (!existingUser) {
          const newUser = await User.create({
            email: user.email,
            name: user.name,
            authProviderId: account.providerAccountId,
            level: "Subscribe",
          });
          user.level = newUser.level;
        } else {
          user.level = existingUser.level;
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
  providers: [
    /**
     * 초기 값 빈 배열
     */
  ],
} satisfies NextAuthConfig;
