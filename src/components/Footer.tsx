import Link from "next/link";
import Button from "./Button";
import { getSession } from "@/libs/getSession";

import { headers } from "next/headers";

export default async function Footer() {
  const session = await getSession();
  const headersList = headers();
  const headerPathname = headersList.get("x-pathname") || "";
  const getIsCurrentPage = (pathname: string) => headerPathname === pathname;

  return (
    <footer className="grid grid-cols-auto-fill items-center justify-between w-full fixed bottom-0 bg-primary text-white text-center">
      <Link
        className={`p-5 font-[700] hover:animate-pulse-fast ${
          getIsCurrentPage("/") && "text-dark-4f"
        }`}
        href="/"
      >
        HOME
      </Link>
      <Link
        className={`p-5 font-[700] hover:animate-pulse-fast ${
          getIsCurrentPage("/my-list") && "text-dark-4f"
        }`}
        href="/my-list"
      >
        LIST
      </Link>
      {session ? (
        <Button className="p-5 font-[700] hover:animate-pulse-fast">
          LOGOUT
        </Button>
      ) : (
        <Link
          className={`p-5 font-[700] hover:animate-pulse-fast ${
            getIsCurrentPage("/login") && "text-dark-4f"
          }`}
          href="/login"
        >
          LOGIN
        </Link>
      )}
      {!session && (
        <Link
          className={`p-5 font-[700] hover:animate-pulse-fast ${
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
