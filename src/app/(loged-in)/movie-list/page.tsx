import AddMovieForm from "@/components/AddMovieForm";
import MovieList from "@/components/MovieList";
import Title from "@/components/Title";

export default function MovieListPage() {
  return (
    <main className="w-full py-10 px-6">
      <Title
        className="mb-4 text-dark-4f"
        h1Text="Movie List"
        h2Text="나의 기록을 관리해요 ⸝⁺✧₍ᐢ..ᐢ₎♡̷ ₌₃"
      />
      <AddMovieForm />
      <MovieList movieList={[]} />
    </main>
  );
}
