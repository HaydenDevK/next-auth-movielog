export const fetchMovies = async (type: string, page = 1) =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_LOCAL_HOST_URL}/api/tmdb-movies?type=${type}&page=${page}`
    )
  ).json();
