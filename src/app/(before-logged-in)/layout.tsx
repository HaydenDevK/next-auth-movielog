import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

export default async function BeforeLoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // (before-logged-in) 하위 페이지는 비 로그인 상태에서만 접근 가능
  const session = await getSession();
  if (session) redirect("/");

  return <>{children}</>;
}
