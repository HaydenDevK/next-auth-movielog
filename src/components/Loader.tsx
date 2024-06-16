"use client";

import { useEffect } from "react";
import { RiLoaderLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";

export default function Loader({ path }: { path: string }) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
    }
  }, [inView]);

  return (
    <div ref={ref} className="flex justify-center items-center py-10 bg-black">
      <RiLoaderLine
        className={`text-5xl text-white ${true && "animate-spin"}`}
      />
    </div>
  );
}
