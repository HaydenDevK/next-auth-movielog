import Input from "./Input";
import Button from "./Button";
import { searchMovieAction } from "@/libs/actions";
import SearchedMovieList from "./SearchedMovieList";
import { useSearchedMediaListStore } from "@/store/searchedMediaStore";

export default function AddMovieForm() {
  const searchedMediaList =
    useSearchedMediaListStore.getState().searchedMediaList;
  const searchKeyword = useSearchedMediaListStore.getState().searchKeyword;

  return (
    <section>
      <form className="flex gap-2 mb-4" action={searchMovieAction}>
        <Input
          required
          type="text"
          name="query"
          className="grow"
          placeholder={"검색어를 입력해주세요."}
        />
        <Button
          className="w-[77px] rounded-lg bg-dark-4f text-white hover:bg-blue-500"
          type="submit"
        >
          검색
        </Button>
      </form>
      <SearchedMovieList
        searchedMediaList={searchedMediaList}
        searchKeyword={searchKeyword}
      />
    </section>
  );
}
