"use client";

import { useRouter } from "next/navigation";

export default function RootError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <>
      <h1>에러가 발생했습니다. ({error.message})</h1>
      <br />
      <button type="button" onClick={() => router.replace("/")}>
        홈으로 돌아가기
      </button>
    </>
  );
}
