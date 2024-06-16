import AddMovieForm from "@/components/AddMovieForm";
import MovieList from "@/components/MovieList";
import Title from "@/components/Title";

export default function MovieListPage() {
  return (
    <>
      <main className="w-full rounded-lg py-10 px-6 bg-white text-[#4b4b4b]">
        <Title
          h1Text="Movie List"
          h2Text="나의 기록을 관리해요. ⸝⁺✧₍ᐢ..ᐢ₎♡̷ ₌₃"
        />
        <AddMovieForm />
        <MovieList movieList={[]} />
      </main>
    </>
  );
}
