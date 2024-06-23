import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

export default async function AfterSubscribeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // (after-logged-in) 하위 페이지는 비 로그인 상태에서만 접근 가능
  const session = await getSession();
  if (!session) redirect("/login");

  return <>{children}</>;
}
