import Input from "./Input";
import Button from "./Button";
import Title from "./Title";

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
      <ul className="h-40 border border-dark-4f rounded-lg overflow-y-scroll">
        {[1, 2, 3].map((movie) => (
          <li>
            <form>
              <Input required type="hidden" value={"movie.title"} />
              <Button
                className="w-full flex items-center gap-2 mb-4 hover:bg-lime-300"
                type="submit"
              >
                <p className="grow px-[14px] py-3 rounded-lg text-[14px] font-[500] leading-normal text-light-ac text-left ">
                  {"movie.title"}
                </p>
                <p className="w-[77px] text-dark-4f">추가</p>
              </Button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
