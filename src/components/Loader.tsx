"use client";

import { useEffect, useRef } from "react";
import { RiLoaderLine } from "react-icons/ri";
import { useInView } from "react-intersection-observer";

export default function Loader({ handleInView }: { handleInView: () => void }) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      handleInView();
    }
  }, [inView, handleInView]);

  return (
    <div ref={ref} className="flex justify-center items-center py-4">
      <RiLoaderLine
        className={`text-3xl text-primary ${inView && "animate-spin"}`}
      />
    </div>
  );
}
