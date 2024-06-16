import { TMovie } from "@/type/movie";
import CheckboxImage from "./CheckboxImage";
import { v4 as uuidv4 } from "uuid";

type TMovieCheckbox = {
  children: React.ReactNode;
  watched: TMovie["watched"];
  onClickCheckbox: () => void;
};

const MovieCheckbox = (props: TMovieCheckbox) => {
  const { children, watched, onClickCheckbox } = props;
  const id = uuidv4();
  return (
    <label
      className={`flex items-center gap-[8px] grow text-dark-35 text-[14px] font-[400] loading-normal cursor-pointer decoration-s ${
        watched && "line-through"
      }`}
      htmlFor={id}
    >
      <div className="flex items-center justify-center w-[23px] h-[23px] border-2 border-dark-4f rounded-[4px] cursor-pointer">
        {watched && <CheckboxImage />}
      </div>
      <input
        className="hidden"
        id={id}
        type="checkbox"
        checked={watched}
        onChange={onClickCheckbox}
      />
      {children}
    </label>
  );
};

export default MovieCheckbox;
