import { TMovie } from "@/type/movie";
import { v4 as uuidv4 } from "uuid";
import { FaHeartCircleCheck, FaRegHeart } from "react-icons/fa6";

type TMovieCheckbox = {
  watched: TMovie["watched"];
};

const MovieCheckbox = (props: TMovieCheckbox) => {
  const { watched } = props;
  const id = uuidv4();
  return (
    <form>
      <label
        className="flex items-center gap-[12px] grow text-dark-35 text-[14px] font-[400] loading-normal cursor-pointer decoration-s"
        htmlFor={id}
      >
        {watched ? (
          <FaHeartCircleCheck className="text-[20px] text-primary hover:animate-ping" />
        ) : (
          <FaRegHeart className="text-[20px] text-light-ac hover:animate-ping" />
        )}
        <input className="hidden" id={id} type="checkbox" checked={watched} />
      </label>
    </form>
  );
};

export default MovieCheckbox;
