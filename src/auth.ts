import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "./libs/db";
import { User } from "./libs/schema";
import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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

        // 유효한 사용자에게 유저 정보 리턴
        // auth.js 에서 기본 제공하는 key 값이 있는데, level id는 없기 때문에 별도로 추가해줘야 한다.
        return {
          name: user.name,
          email: user.email,
          level: user.level,
          id: user._id, // 몽고디비에서 부여한 id
        };
      },
    }),
  ],
});

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    console.log("필수 입력 값을 모두 입력 해주세요.");
    // throw new Error("필수 입력 값을 모두 입력 해주세요.")
    return;
  }

  try {
    // auth.js 연동
  } catch (e) {
    console.error(e);
  }
}
