"use client";

import { TMovie } from "@/type/movie";
import MovieCheckbox from "./MovieCheckbox";
import Button from "./Button";

type TMovieItemProps = {
  movie: TMovie;
};

export default function MovieItem(props: TMovieItemProps) {
  const { movie } = props;

  return (
    <li>
      <form className="flex gap-[15px] pl-[14px] bg-[#35383E]/5 border border-dark-4f rounded-lg text-dark-4f overflow-hidden">
        <MovieCheckbox watched={movie.watched} onClickCheckbox={() => {}}>
          <span
            className={`${
              movie.watched && "line-through"
            } text-[#35383E] text-[14px] font-[500] leading-normal`}
          >
            {movie.text}
          </span>
        </MovieCheckbox>

        <Button
          className="w-[77px] py-3 rounded-lg hover:bg-red-500 hover:text-white"
          type="submit"
        >
          삭제
        </Button>
      </form>
    </li>
  );
}
