import Link from "next/link";
import Button from "./Button";
import { getSession } from "@/libs/getSession";

import { headers } from "next/headers";
import { logoutAction } from "@/libs/actions";

export default async function Footer() {
  const session = await getSession(); // 로그인 여부에 따라 로그인 버튼 / 로그아웃 버튼 조건부 렌더링

  const headersList = headers();
  const headerPathname = headersList.get("x-pathname") || "";
  const getIsCurrentPage = (pathname: string) => headerPathname === pathname;

  return (
    <footer className="flex items-center justify-between w-full fixed bottom-0 bg-primary text-white text-center">
      <Link
        className={`grow p-5 font-[700] hover:animate-pulse-fast ${
          getIsCurrentPage("/") && "text-dark-4f"
        }`}
        href="/"
      >
        HOME
      </Link>
      <Link
        className={`grow p-5 font-[700] hover:animate-pulse-fast ${
          getIsCurrentPage("/my-list") && "text-dark-4f"
        }`}
        href="/my-list"
      >
        LIST
      </Link>
      {session ? (
        <form action={logoutAction} className="grow">
          <Button className="p-5 font-[700] hover:animate-pulse-fast">
            LOGOUT
          </Button>
        </form>
      ) : (
        <Link
          className={`grow p-5 font-[700] hover:animate-pulse-fast ${
            getIsCurrentPage("/login") && "text-dark-4f"
          }`}
          href="/login"
        >
          LOGIN
        </Link>
      )}
      {!session && (
        <Link
          className={`grow p-5 font-[700] hover:animate-pulse-fast ${
            getIsCurrentPage("/signup") && "text-dark-4f"
          }`}
          href="/signup"
        >
          SIGN UP
        </Link>
      )}
    </footer>
  );
}
