import { getSession } from "@/libs/getSession";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // (after-subscribe) 하위 페이지는 level이 "Subscribe"인 유저만 접근 가능
  const session: any = await getSession();
  // console.log(session);
  if (!session) redirect("/login");
  if (session.user.level !== "Subscribe") redirect("/");

  return <>{children}</>;
}
