"use client";

import { TMovie } from "@/type/movie";
import MovieCheckbox from "./MovieCheckbox";
import Button from "./Button";
import { FaHeartCircleMinus } from "react-icons/fa6";

type TMovieItemProps = {
  movie: TMovie;
};

export default function MovieItem(props: TMovieItemProps) {
  const { movie } = props;

  return (
    <li className="flex items-center gap-3 h-11 px-[14px] bg-[#35383E]/5 border border-dark-4f rounded-lg text-dark-4f overflow-hidden">
      <MovieCheckbox watched={movie.watched}></MovieCheckbox>

      <form className="text-[0px] grow">
        <button
          className={
            "text-[#35383E] text-[14px] font-[500] leading-normal hover:text-primary"
          }
        >
          {movie.title}
        </button>
      </form>

      <form className="text-[0px]">
        <button>
          <FaHeartCircleMinus className="text-[20px] text-red-500 hover:animate-ping" />
        </button>
      </form>
    </li>
  );
}
