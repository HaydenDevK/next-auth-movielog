import Input from "./Input";
import Button from "./Button";
import Title from "./Title";
import { FaHeartCirclePlus } from "react-icons/fa6";

export default function AddMovieForm() {
  return (
    <section>
      <form className="flex gap-2 mb-4">
        <Input required type="text" className="grow" placeholder={"검색어"} />
        <Button
          className="w-[77px] rounded-lg bg-dark-4f text-white hover:bg-blue-500"
          type="submit"
        >
          검색
        </Button>
      </form>
      <ul className="max-h-40 border border-dark-4f rounded-lg overflow-y-scroll">
        {[1, 2, 3].map((movie, index) => (
          <li key={index}>
            <form className="flex gap-[14px] h-11 pr-[14px] py-lg">
              <input required type="hidden" value={"movie.title"} />
              <button
                className="w-full pl-[14px] rounded-lg text-[14px] font-[500] leading-normal text-left text-light-ac hover:text-primary"
                type="submit"
              >
                {"movie.title"}
              </button>

              <button>
                <FaHeartCirclePlus className="text-[20px] text-primary hover:animate-ping" />
              </button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
